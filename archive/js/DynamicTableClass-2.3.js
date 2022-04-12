class DynamicTable {

    constructor(itemsName, dataObject, rowRenderFunction, containerId = null) {

        this.containerId = (containerId != null) ? containerId : `${itemsName}Table`;

        if (!this.containerId || !(this.container = document.getElementById(this.containerId)) || !dataObject || !rowRenderFunction) return false;

        this.filterLogicEnum = {
            StringContains: 0,
            StartsWith: 1,
            WordStartsWith: 2,
            ListIncludes: 3,
            Equals: 4,
            LessThan: 5,
            GreaterThan: 6,
            ArrayIncludes: 7
        };
        this.sortMethodEnum = {
            ALPHABETICAL: 0,
            NUMERICAL: 1
        };
        this.sortOrderEnum = {
            ASC: 0,
            DESC: 1
        };

        this.deprecatedNames = ["webkitStorageInfo"];
        this.setInstanceName();

        this.currSortKey = "";
        this.currSortOrder = this.sortOrderEnum.ASC;
        this.dataObject = dataObject;
        this.filteredTable = dataObject;
        this.renderRow = rowRenderFunction;
        this.filterLists = [];
        this.filterANDList = [];
        this.showSummary = true;

        this.itemsName = itemsName;

        this.pinningEnabled = false;
        this.pinnedKey = "";
        this.pinnedItems = [];
        this.onPinFunction = null;
        this.onUnpinFunction = null;

        this.currentPage = 1;
        this.rowsPerPage = this.dataObject.length;
        this.maxButtons = 15;

        this.update();
    }

    getInstanceName() {
        for (var name in window) {
            if (!this.deprecatedNames.includes(name) && window[name] === this)
                return name;
        }
    }

    setInstanceName() {
        this.instanceName = this.getInstanceName();
    }

    resolve(obj, path) {
        return path.split('.').reduce(function (subObj, key) {
            return subObj ? subObj[key] : null;
        }, obj || self);
    }

    getIndexByKeyAndValue(key, value) {
        for (let i = 0; i < this.dataObject.length; i++) {
            if (this.resolve(this.dataObject[i], key) === value) {
                return i;
            }
        }
        return -1;
    }

    getItemsByKeyAndValue(key, value) {
        return this.dataObject.filter(function (row) {
            return (this.resolve(row, key) === value);

        }, this);
    }

    sort(sortKey, method = this.sortMethodEnum.ALPHABETICAL) {
        if (this.resolve(this.dataObject[0], sortKey) === undefined) return false;
        if (sortKey != this.currSortKey) {
            this.currSortKey = sortKey;
            this.currSortOrder = this.sortOrderEnum.ASC;
            var thisObj = this;
            switch (method) {
                case this.sortMethodEnum.ALPHABETICAL:
                    this.dataObject.sort(function (a, b) { return (thisObj.resolve(a, sortKey) || "").toString().localeCompare(thisObj.resolve(b, sortKey)); });
                    break;
                case this.sortMethodEnum.NUMERICAL:
                    this.dataObject.sort(function (a, b) { return (thisObj.resolve(a, sortKey) - thisObj.resolve(b, sortKey)); });
                    break;
            }
        } else {
            this.currSortOrder = (this.currSortOrder == this.sortOrderEnum.ASC) ? this.sortOrderEnum.DESC : this.sortOrderEnum.ASC;
            this.dataObject.reverse();
        }
        this.currentPage = 1;
        this.update();
    }

    sortWithOrder(sortKey, order, method = this.sortMethodEnum.ALPHABETICAL) {
        if (this.resolve(this.dataObject[0], sortKey) === undefined) return false;
        if (sortKey != this.currSortKey) {
            this.currSortKey = sortKey;
            let thisObj = this;
            if (order == this.sortOrderEnum.ASC) {

                this.currSortOrder = this.sortOrderEnum.ASC;
                switch (method) {
                    case this.sortMethodEnum.ALPHABETICAL:
                        this.dataObject.sort(function (a, b) { return (thisObj.resolve(a, sortKey) || "").toString().localeCompare(thisObj.resolve(b, sortKey)); });
                        break;
                    case this.sortMethodEnum.NUMERICAL:
                        this.dataObject.sort(function (a, b) { return (thisObj.resolve(a, sortKey) - thisObj.resolve(b, sortKey)); });
                        break;
                }
            } else {
                this.currSortOrder = this.sortOrderEnum.DESC;
                switch (method) {
                    case this.sortMethodEnum.ALPHABETICAL:
                        this.dataObject.sort(function (b, a) { return (thisObj.resolve(a, sortKey) || "").toString().localeCompare(thisObj.resolve(b, sortKey)); });
                        break;
                    case this.sortMethodEnum.NUMERICAL:
                        this.dataObject.sort(function (b, a) { return (thisObj.resolve(a, sortKey) - thisObj.resolve(b, sortKey)); });
                        break;
                }
            }
        } else {
            this.currSortOrder = (this.currSortOrder == this.sortOrderEnum.ASC) ? this.sortOrderEnum.DESC : this.sortOrderEnum.ASC;
            this.dataObject.reverse();
        }
        this.currentPage = 1;
        this.update();
    }


    filter(filterName, filterQuery = "", filterORList = []) {
        if (filterName != "") {
            this.currentPage = 1;
            if (filterQuery !== "" && typeof (filterORList) == "object") {
                if (this.filterANDList[filterName] && this.filterANDList[filterName].query == filterQuery && JSON.stringify(this.filterANDList[filterName].orList) == JSON.stringify(filterORList)) { return false; };
                this.filterANDList[filterName] = { query: filterQuery, orList: filterORList };
            } else {
                delete this.filterANDList[filterName];
            }
            this.update();
        }
    }

    addFilterList(filterSelectId, filterText, filterValue, filterQueryFunction, filterORList = []) {
        let filterSelect = document.getElementById(filterSelectId);
        if (filterSelect != null
            && filterText != ""
            && filterValue != ""
            && typeof (filterQueryFunction) == "function"
            && typeof (filterORList) == "object") {
            this.filterLists[filterSelectId] = { text: filterText, value: filterValue, queryFunction: filterQueryFunction, orList: filterORList };
            filterSelect.addEventListener("change", this.updateFilter.bind(this, filterSelectId));
        }
    }

    updateFilter(filterSelectId) {
        let filterListObject = this.filterLists[filterSelectId];
        let filterListSelect = document.getElementById(filterSelectId);
        let filterQuery = filterListObject.queryFunction.call(filterListSelect);

        this.filter(filterSelectId, filterQuery, filterListObject.orList);
    }

    filtered(row) {
        return Object.keys(this.filterANDList).every(function (filterName) {
            let filter = this.filterANDList[filterName];
            return filter.orList.some(function (rule) {
                let value = this.resolve(row, rule.key);
                if (value != null) {
                    switch (rule.logic) {
                        case this.filterLogicEnum.StringContains:
                            return value.toString().toUpperCase().includes(filter.query.toUpperCase());
                            break;
                        case this.filterLogicEnum.StartsWith:
                            return value.toString().toUpperCase().startsWith(filter.query.toUpperCase());
                            break;
                        case this.filterLogicEnum.WordStartsWith:
                            try {
                                let wordStartsWithRegex = new RegExp('( |^)(' + filter.query + ')', 'gi');
                                return wordStartsWithRegex.test(value.toString().toUpperCase());
                            } catch {
                                return false;
                            }
                            break;
                        case this.filterLogicEnum.ListIncludes: // is 1 in 1,2?
                            return value.toString().toUpperCase().split(',').some(function (value) { return (value == filter.query) }, this);
                            break;
                        case this.filterLogicEnum.Equals:
                            return (value.toString().toUpperCase() == filter.query.toString().toUpperCase());
                            break;
                        case this.filterLogicEnum.LessThan:
                            return (value < filter.query);
                            break;
                        case this.filterLogicEnum.GreaterThan:
                            return (value > filter.query);
                            break;
                        case this.filterLogicEnum.ArrayIncludes:
                            return (value.includes(filter.query));
                            break;
                  }
                }
            }, this);
        }, this);
    }

    showPage(page) {
        this.currentPage = page;
        this.update();
    }

    setRowsPerPage(rows) {
        this.currentPage = 1;
        this.rowsPerPage = parseInt(rows);
        this.update();
    }

    doFiltersExist() {
        return (Object.keys(this.filterANDList).length > 0);
    }

    enablePinning(pinnedKey) {
        this.pinnedKey = pinnedKey;
        this.pinningEnabled = true;
    }

    pinnedReset() {
        this.pinnedItems = [];
        this.update();
    }

    pin(id) {
        if (this.pinningEnabled) {
            if (this.pinnedItems.includes(id)) {
                return false;
            } else {
                let item = this.getItemsByKeyAndValue(this.pinnedKey, id)[0];
                if (item != null) {
                    this.pinnedItems.push(id);
                }
                if (this.onPinFunction != null) this.onPinFunction.call(item);
            }
            this.update();
        }
        else console.log(`${this.instanceName}: Pinning is not currently enabled.`);
    }

    unpin(id) {
        if (this.pinningEnabled) {
            if (this.pinnedItems.includes(id)) {
                let index = this.pinnedItems.indexOf(id);
                this.pinnedItems.splice(index, 1);
                if (this.onUnpinFunction != null) this.onUnpinFunction.call(id);
            } else {
                return false;
            }
            this.update();
        }
        else console.log(this.instanceName + ": Pinning is not currently enabled.");
    }

    renderTableInfo(startIndex, endRow, totalRows) {
        let totalPages = Math.ceil(totalRows / this.rowsPerPage);
        let infoHTML = "";
        infoHTML += "<div class='row'><div class='col-12 text-center'>";
        infoHTML += this.renderPaginationNav(this.currentPage, totalPages);
        if (this.showSummary) infoHTML += "<div class='px-1 mb-1'>Showing " + (startIndex + 1) + " to " + endRow + " of " + totalRows + " " + this.itemsName.toLowerCase() + "</div>";
        infoHTML += "</div></div>";
        return infoHTML;
    }

    renderPaginationButton(pageNumber, currentPage) {
        if (pageNumber == currentPage) {
            return '<li class="page-item active"><span class="page-link">' + pageNumber + '<span class="sr-only">(current)</span></span></li>';
        } else {
            return '<li class="page-item"><a class="page-link" href="javascript://" onclick="' + this.instanceName + '.showPage(' + pageNumber + ')">' + pageNumber + '</a></li>';
        }
    }

    renderPaginationButtons(startPage, endPage, currentPage) {
        let html = "";
        for (let page = startPage; page <= endPage; page++) {
            html += this.renderPaginationButton(page, currentPage);
        }
        return html;
    }

    renderPaginationEllipsis() {
        return '<p class="page-item disabled"><a class="page-link">&hellip;</a></p>';
    }

    renderPaginationNavHeader() {
        return '<nav aria-label="pagination" class="d-flex justify-content-center align-items-start"><ul class="pagination mb-0 d-flex justify-content-center align-items-baseline">';
    }

    renderPaginationNavFooter() {
        return '</ul><a class="ml-1 btn btn-light" href="javascript://" onClick="' + this.instanceName + '.setRowsPerPage(' + this.dataObject.length + ');">Show All</a></nav>';
    }

    renderPaginationPreviousButton(currentPage) {
        if (currentPage == 1) {
            return '<li class="page-item disabled"><a class="page-link" href="javascript://" tabindex="-1">Previous</a></li>';
        } else {
            return '<li class="page-item"><a class="page-link" href="javascript://" onclick="' + this.instanceName + '.showPage(' + (currentPage - 1) + ');">Previous</a></li>';
        }
    }

    renderPaginationNextButton(currentPage, totalPages) {
        if (currentPage == totalPages) {
            return '<li class="page-item disabled"><a class="page-link" href="javascript://" tabindex="-1">Next</a></li>';
        } else {
            return '<li class="page-item"><a class="page-link" href="javascript://" onclick="' + this.instanceName + '.showPage(' + (currentPage + 1) + ');">Next</a></li>';
        }
    }

    shouldPaginate(totalRows) {
        return (this.rowsPerPage < totalRows);
    }

    shouldShowAllButtons(totalPages) {
        return (totalPages < this.maxButtons);
    }

    skippedPages(currentPage, middleButtons, totalPages) {
        if ((currentPage - middleButtons / 2) - 1 <= 1) {
            return "atEnd";
        } else if ((currentPage + middleButtons / 2) + 1 >= totalPages) {
            return "atStart";
        } else {
            return "both";
        }
    }

    renderPaginationNav(currentPage, totalPages) {
        let paginationNavHTML = "";
        paginationNavHTML += this.renderPaginationNavHeader();
        paginationNavHTML += this.renderPaginationPreviousButton(currentPage);
        let startPage, endPage;
        if (this.shouldShowAllButtons(totalPages)) {
            startPage = 1;
            endPage = totalPages;
            paginationNavHTML += this.renderPaginationButtons(startPage, endPage, currentPage)
        } else {
            paginationNavHTML += this.renderPaginationButton(1, currentPage);
            let middleButtons = (this.maxButtons - 2);
            switch (this.skippedPages(currentPage, middleButtons, totalPages)) {
                case "atEnd":
                    startPage = 2;
                    endPage = middleButtons;
                    paginationNavHTML += this.renderPaginationButtons(startPage, endPage, currentPage);
                    paginationNavHTML += this.renderPaginationEllipsis();
                    break;
                case "atStart":
                    startPage = (totalPages - middleButtons + 1);
                    endPage = (totalPages - 1);
                    paginationNavHTML += this.renderPaginationEllipsis();
                    paginationNavHTML += this.renderPaginationButtons(startPage, endPage, currentPage);
                    break;
                case "both":
                    startPage = Math.ceil(currentPage - (middleButtons - 2) / 2);
                    endPage = Math.floor(currentPage + (middleButtons - 2) / 2);
                    paginationNavHTML += this.renderPaginationEllipsis();
                    paginationNavHTML += this.renderPaginationButtons(startPage, endPage, currentPage);
                    paginationNavHTML += this.renderPaginationEllipsis();
                    break;
            }
            paginationNavHTML += this.renderPaginationButton(totalPages, currentPage);
        }
        paginationNavHTML += this.renderPaginationNextButton(currentPage, totalPages);
        paginationNavHTML += this.renderPaginationNavFooter();
        return paginationNavHTML;
    }

    async updateFilterLists() {
        Object.keys(this.filterLists).forEach(function (filterSelectId) {
            let filterSelect = document.getElementById(filterSelectId);
            let currentValue = filterSelect.value;
            let filterText = this.filterLists[filterSelectId].text;
            let filterValue = this.filterLists[filterSelectId].value;
            let options = [];
            let compareFunction = function (a, b) { return (this.resolve(a, filterValue) - this.resolve(b, filterValue)) };
            let prevValue = null;
            let sortedTable = this.filteredTable.sort(compareFunction.bind(this));
            sortedTable.forEach(function (row) {
                if (prevValue != this.resolve(row, filterValue)) {
                    prevValue = this.resolve(row, filterValue);
                    options.push({ text: this.resolve(row, filterText), value: prevValue });
                }
            }, this);
            filterSelect.innerText = '';

            let optionNode = document.createElement("option");
            optionNode.setAttribute("value", "");
            optionNode.innerHTML = "&mdash; Select &mdash;";
            filterSelect.appendChild(optionNode);

            options.forEach(function (option) {
                let optionNode = document.createElement("option");
                optionNode.setAttribute("value", option.value);
                if (option.value == currentValue) optionNode.setAttribute("selected", "selected");
                optionNode.innerText = option.text;
                filterSelect.appendChild(optionNode);
            });
        }, this);
    }

    update() {
        this.instanceName = this.getInstanceName();
        let table = this.dataObject;

        if (this.pinningEnabled) {
            table = table.filter(function (row) { return !this.pinnedItems.includes(this.resolve(row, this.pinnedKey)); }, this);
        }

        if (this.doFiltersExist()) {
            table = table.filter(function (row) { return this.filtered(row); }, this);
        }

        this.filteredTable = table;
        this.updateFilterLists();

        let totalRows = table.length;
        let totalPages = Math.ceil(totalRows / this.rowsPerPage);
        if (this.currentPage > totalPages && this.currentPage > 1) this.currentPage = totalPages;

        let startIndex = (this.currentPage - 1) * this.rowsPerPage;
        let endRow = (startIndex + this.rowsPerPage < totalRows) ? startIndex + this.rowsPerPage : totalRows;

        let tableHTML = "";
        for (let i = startIndex; i < endRow; i++) {
            tableHTML += this.renderRow(table[i]);
        }
        this.container.innerHTML = tableHTML;

        let tableInfo;
        if (tableInfo = document.getElementsByName(this.containerId + '-Info')) {
            let infoHTML;

            if (this.shouldPaginate(totalRows)) {
                infoHTML = this.renderTableInfo(startIndex, endRow, totalRows);
            } else {
                infoHTML = "";
            }
            tableInfo.forEach(function (container) {
                container.innerHTML = infoHTML;
            }, this);
        }
    }
}