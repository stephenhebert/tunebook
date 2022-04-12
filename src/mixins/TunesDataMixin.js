import metaFields from '../metafields'

export default {
  methods: {
    TunesData_getMeta(abc) {
      const metaObj = metaFields.reduce((retObj, field) => {
        const regex = this.TunesData_getMetaFieldRegex(field)
        const matches = abc.match(regex)
        if (matches && matches[1]) {
          const value = matches[1]
          if (retObj[field.key] === undefined) retObj[field.key] = [value]
          else retObj[field.key].push(value)
        }
        return retObj
      }, {})
      return metaObj
    },
    TunesData_getMetaFieldRegexInnerString(field) {
      return `${field.identifier}: ?([\\w\\d=,':#/\\. ]*)`
    },
    TunesData_getMetaFieldRegex(field) {
    //     const textFieldRegexString = `^${tf.identifier}: *(.*)$\\n`
    //     const textFieldRegex = new RegExp(textFieldRegexString, 'gm')
      return new RegExp(`^${this.TunesData_getMetaFieldRegexInnerString(field)}$`, 'm')
    },
    TuneData_getMetaFieldRegexStringsByKeys(...args) {
      return args.map(arg => this.TunesData_getMetaFieldRegexInnerString(metaFields.filter(field => field.key === arg)[0]))
    },
  },
}
