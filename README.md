<h1 align="center">
  🦄<br>
  igogo<br>
  <a href="https://travis-ci.org/bigslycat/igogo">
    <img alt="Travis badge" src="https://travis-ci.org/bigslycat/igogo.svg?branch=master">
  </a>
  <a href="https://greenkeeper.io/">
    <img alt="Greenkeeper badge" src="https://badges.greenkeeper.io/bigslycat/igogo.svg">
  </a>
</h1>

<p align="center">
  Fast Either and Maybe from
  <a href="https://github.com//fantasyland/fantasy-land">Fantasy Land</a>
</p>

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
