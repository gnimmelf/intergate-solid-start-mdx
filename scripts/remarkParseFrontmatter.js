import {
  frontmatterFromMarkdown,
  frontmatterToMarkdown
} from 'mdast-util-frontmatter'
import { parse as parseYaml } from 'yaml'
import { define } from 'unist-util-mdx-define'
import { valueToEstree } from 'estree-util-value-to-estree'
import { frontmatter } from 'micromark-extension-frontmatter'

/**
 *
 * @param {*} extentions
 */
function initializePlugin(pluginInstance, format = 'yaml') {
  const extentions = pluginInstance.data()

  const micromarkExtensions = extentions.micromarkExtensions || (extentions.micromarkExtensions = [])
  const fromMarkdownExtensions = extentions.fromMarkdownExtensions || (extentions.fromMarkdownExtensions = [])
  const toMarkdownExtensions = extentions.toMarkdownExtensions || (extentions.toMarkdownExtensions = [])

  micromarkExtensions.push(frontmatter(format))
  fromMarkdownExtensions.push(frontmatterFromMarkdown(format))
  toMarkdownExtensions.push(frontmatterToMarkdown(format))
}

export default function plugin(options = {}) {
  const self = this
  options = Object.assign({
    dataKey: 'frontmatter',
    format: 'yaml',
    parser: parseYaml
  }, options)

  initializePlugin(self, options.format)

  return function transformer(ast, vfile) {
    let data

    const node = ast.children.find((child) => options.format === child.type)
    if (node) {
      const { value } = node
      data = options.parser(value)
    }

    // Add data to vfile -
    vfile.data = data

    // Add data as an export to the ast
    define(ast, vfile, { [options.dataKey]: valueToEstree(data, { preserveReferences: true }) }, options)
  };
};

