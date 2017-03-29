module.exports = [
  require('postcss-mixins')({
    mixins: require('../styles/mixins')
  }),
  require('postcss-simple-vars')({
    variables: () => require('../styles/variables'),
    unknown: (node, name, result) => {
      node.warn(result, 'Unknown variable ' + name)
    }
  }),
  require('postcss-nested'),
  require('lost'),
  require('postcss-normalize')
]
