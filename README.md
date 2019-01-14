<h1 align="center">
  🦄<br>
  igogo<br>
    <a href="https://www.npmjs.com/package/igogo">
    <img alt="Npm version" src="https://img.shields.io/npm/v/igogo.svg?style=flat-square">
  </a>
  <a href="https://travis-ci.org/bigslycat/igogo">
    <img alt="Travis badge" src="https://img.shields.io/travis/bigslycat/igogo/master.svg?style=flat-square">
  </a>
  <a href="https://greenkeeper.io/">
    <img alt="Greenkeeper badge" src="https://badges.greenkeeper.io/bigslycat/igogo.svg?style=flat-square">
  </a>
</h1>

<div align="center">
<strong >
  Fast Either and Maybe from
  <a href="https://github.com//fantasyland/fantasy-land">Fantasy Land</a>
  with Flow and TypeScript support.
</strong>
</div>

## Install

### npm

```
npm install --save igogo
```

### Yarn

```
yarn add igogo
```

## API

```ts
import {
 type Maybe,
 type Either,
 Just,
 Nothing,
 fromNullable,
 opt,
 when,
 nothing,
 Left,
 Right,
 ifElse,
} from 'igogo'

function Just<T>(value: T): Maybe<T>
function Nothing<T>(value: T): Maybe<T>
function fromNullable<T>(value: ?T): Maybe<T>
function opt<T>(value: ?T): Maybe<T>
function when<V>(condition: boolean, value: V): Maybe<V>
function when<V>(predicate: mixed => boolean, value: V): Maybe<V>

const nothing: Maybe<any>

function Left<L, R>(left: L): Either<L, R>
function Right<L, R>(right: R): Either<L, R>
function ifElse<L, R>(condition: boolean, right: R, left: L): Either<L, R>
```
