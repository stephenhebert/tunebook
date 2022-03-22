const metaFields = [
  { key: 'index', identifier: 'X', save: false },
  { key: 'title', identifier: 'T', save: true },
  { key: 'notes', identifier: 'N', save: true },
  { key: 'history', identifier: 'H', save: true },
  { key: 'composer', identifier: 'C', save: true },
  { key: 'type', identifier: 'R', save: true },
  { key: 'origin', identifier: 'O', save: true },
  { key: 'source', identifier: 'S', save: true },
  { key: 'recordings', identifier: 'D', save: true },
  { key: 'transcription', identifier: 'Z', save: true },
]


export default {
  methods: {
    TunesData_getMetaFieldRegex(field) {
    //     const textFieldRegexString = `^${tf.identifier}: *(.*)$\\n`
    //     const textFieldRegex = new RegExp(textFieldRegexString, 'gm')
      return new RegExp(`^${field.identifier}: *(.*)$`)
    },
    TunesData_isLineMetaField(line, field) {
      return line.test(this.TunesData_getMetaFieldRegex(field))
    },
    TunesData_getLineMetaData(line, field) {
      const regex = this.TunesData_getMetaFieldRegex(field)
      return line.match(regex)[1]
    },
    TunesData_findMetaField(line) {
      return this.metaFields.find(field => this.TunesData_isLineMetaField(line, field))
    },
    // TunesData_getMetaData(line) {
    //   const returnObj = {};
    //   this.metaFields.forEach(field => {
    //     if (this.TunesData_isMetaLineForField(line,field)) {
    //       returnObj[field.key] = this.TunesData_getMetaData(line,field)
    //     }
    //   })
    //   return returnObj
    // },
    TunesData_parseTuneData(tuneData) {
      const body = tuneData.body
  
      const tune = { abc: body }

      const lines = body.split('\n')
      lines.forEach((line) => {
        const metaField = this.TunesData_findMetaField(line)
        if (metaField && metaField.save) {
          const metaData = this.TunesData_getLineMetaData(line, metaField)
          if (!tune[metaField.key]) tune[metaField.key] = metaData
          else if (Array.isArray(tune[metaField.key])) tune[metaField.key].push(metaData)
          else tune[metaField.key] = [tune[metaField.key], metaData]
        }
      })
      // if is meta data line, get meta data 

      return tune
  
  
    //   metaFields.forEach(tf => {
    //     const textFieldRegexString = `^${tf.identifier}: *(.*)$\\n`
    //     const textFieldRegex = new RegExp(textFieldRegexString, 'gm')
    //     if (textFieldRegex.test(data)) {
    //       data.match(textFieldRegex).forEach(match => {
    //         let matchText = match.match(new RegExp(textFieldRegexString, 'm'))[1];
    //             if (this[tf.key] == null) {
    //                 this[tf.key] = matchText;
    //             } else {
    //                 switch (tf.method) {
    //                     case "overwrite":
    //                         this[tf.key] = matchText;
    //                         break;
    //                     case "append":
    //                         this[tf.key] += `\n${matchText}`;
    //                         break;
    //                     case "push":
    //                         if (typeof(this[tf.key]) == "string") {
    //                             this[tf.key] = [this[tf.key]];
    //                         }
    //                         this[ftr.key].push(matchText);
    //                         break;
    //                 }
    //             }
    //             this.abc = this.abc.replace(regex,'');
    //         });
    //     }
    // });
  
    },
  },

}