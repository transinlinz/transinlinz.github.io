import * as sass from 'sass';
import postcss from 'postcss';
import tailwindcssPostcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';
import path from 'node:path';

export default async function (eleventyConfig) {
  // SCSS → PostCSS/Tailwind pipeline
  eleventyConfig.addTemplateFormats('scss');
  eleventyConfig.addExtension('scss', {
    outputFileExtension: 'css',
    compile: async function (inputContent, inputPath) {
      const parsed = path.parse(inputPath);
      // Skip partials (files starting with _)
      if (parsed.name.startsWith('_')) {
        return;
      }

      // Step 1: Compile SCSS
      const sassResult = sass.compileString(inputContent, {
        loadPaths: [parsed.dir || '.', 'node_modules'],
      });

      // Step 2: Prepend Tailwind import and process with PostCSS
      const cssWithTailwind = `@import "tailwindcss";\n${sassResult.css}`;
      const postcssResult = await postcss([
        tailwindcssPostcss(),
        autoprefixer(),
      ]).process(cssWithTailwind, { from: inputPath });

      return async () => postcssResult.css;
    },
  });

  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy('src/img');
  eleventyConfig.addPassthroughCopy('src/js');
  eleventyConfig.addPassthroughCopy('src/favicon.ico');
  eleventyConfig.addPassthroughCopy('src/site.webmanifest');
  eleventyConfig.addPassthroughCopy('src/robots.txt');
  eleventyConfig.addPassthroughCopy('src/humans.txt');
  eleventyConfig.addPassthroughCopy('src/CNAME');

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      data: '_data',
    },
  };
}
