const metaFields = [
  { key: 'title', identifier: 'T' },
  { key: 'meter', identifier: 'M' },
  { key: 'quarterNote', identifier: 'L' },
  { key: 'key', identifier: 'K' },
  { key: 'quantize', identifier: 'Q' },
  { key: 'notes', identifier: 'N' },
  { key: 'history', identifier: 'H' },
  { key: 'composer', identifier: 'C' },
  { key: 'type', identifier: 'R' },
  { key: 'origin', identifier: 'O' },
  { key: 'source', identifier: 'S' },
  { key: 'recordings', identifier: 'D' },
  { key: 'transcription', identifier: 'Z' },
]

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
    TunesData_getMetaFieldRegex(field) {
    //     const textFieldRegexString = `^${tf.identifier}: *(.*)$\\n`
    //     const textFieldRegex = new RegExp(textFieldRegexString, 'gm')
      return new RegExp(`^${field.identifier}: ?([\\w\\d/ ]*)$`, 'm')
    },
  },
}
