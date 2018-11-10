# Simple JavaScript documentation and testing

This repo explores different methods and tools for generating documentation from
and running tests found in code comments.


## Generating documentation


### 👍 `jsdoc2md`

[`jsdoc2md`](https://github.com/jsdoc2md/jsdoc-to-markdown) finds jsdoc comments
and transforms them into Markdown files. Running `yarn run docs:jsdoc2md` will
execute the following command:

```sh
jsdoc2md index.js > jsdoc2md.md
```

The format is quite good. See [jsdoc2md.md](jsdoc2md.md) for an example.


### 👎 `documentation`

Similarly, [`documentation`][documentation-repo] is able to generate Markdown
documentation (among other formats) from jsdoc comments in source code. Running
`yarn run docs:documentation` will run the following command:

[documentation-repo]: https://github.com/documentationjs/documentation

```sh
documentation build index.js --format=md > documentation.md
```

Unforunately, the format isn't great. See an example at
[documentation.md](documentation.md).


## Running tests

For simple projects it's nice to keep the source and tests together. Here are a
few ways to do that.


### Writing tests

In [`index.js`](index.js) is a function with the following tests written inside
of a jsdoc `@example` tag:

```js
/**
 * @private
 * @example
 * isInteger(5)     // => true
 * isInteger(5.0)   // => true
 * isInteger(-5)    // => true
 * isInteger(3.14)  // => false
 * isInteger('foo') // => false
 * isInteger(NaN)   // => false
 */
function isInteger(x) {
  return x === Math.floor(x);
}
```


### 👍 `jsdoctest`

[`jsdoctest`][jsdoctest-repo] is a tool for running tests found in jsdoc
comments. Run `yarn run test:jsdoctest` to execute the following command:

[jsdoctest-repo]: https://github.com/yamadapc/jsdoctest

```sh
mocha --require jsdoctest index.js
```

The output should look something like:

```text
  index
    isInteger()
      ✓ isInteger(5)
      ✓ isInteger(5.0)
      ✓ isInteger(-5)
      ✓ isInteger(3.14)
      ✓ isInteger('foo')
      ✓ isInteger(NaN)
  
  
  6 passing (6ms)
```


### 👍 `autodoc`

From the [`autodoc` repo](https://github.com/dtao/autodoc):

> Autodoc lets you write tests in comments just above your JavaScript functions,
> then run those tests from the command line and auto-generate documentation
> with the same tests embedded and  executing right in the browser.

Running `yarn run test:autodoc` will execute the following command, which
finds tests in jsdoc comments in the file `index.js`.

```sh
autodoc --test --verbose index.js
```

Those tests get run and the output looks something like this:

```text
......

  Ran 6 specs in 4ms.
  6 passed, 0 failed
```


## Running performance benchmarks

### `autodoc`

Autodoc can also run performance benchmarks. Running `yarn run autodoc:perf`
will execute the following command:

```sh
autodoc --perf index.js
```

In `index.js` is a function with the following tests under the `@benchmark` tag:

```js
/**
 * @private
 * @benchmarks
 * isInteger(123456789)     // using Math.floor
 * isIntegerLike(123456789) // using RegExp: ^\d+$
 */
function isIntegerLike(x) {
  return (/^\d+$/).test(String(x));
}
```

```text
isIntegerLike - using Math.floor   x 148        - 3,442,802.883 ops/second
isIntegerLike - using RegExp: ^d+$ x 154        - 2,710,701.018 ops/second


Results:

| Function      | Benchmark          | Ops/second    |
------------------------------------------------------
| isIntegerLike | using Math.floor   | 3,442,802.883 |
| isIntegerLike | using RegExp: ^d+$ | 2,710,701.018 |
```
