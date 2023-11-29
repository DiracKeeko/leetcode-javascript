/*
 * [208] 实现 Trie (前缀树)
 */

var Trie = function () {
  this.children = {};
};

/**
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
  let children = this.children;
  for (const ch of word) {
    children[ch] = children[ch] || {};
    children = children[ch];
  }
  children.end = true;
};

/**
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
  let res = this.startsWith(word);
  return res && res.end !== undefined;
};

/**
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
  let { children } = this;
  for (const ch of prefix) {
    if (children[ch] === undefined) {
      return false;
    }
    children = children[ch];
  }
  // return true; // 不要直接返回true, 返回当前节点，便于search操作
  return children;
};



// test
const trie = new Trie();
trie.insert("apple");
// trie.search("apple");   // 返回 True
// trie.search("app");     // 返回 False
const res = trie.startsWith("app"); // 返回 True
// trie.insert("app");
// trie.search("app");

console.log({res});
// console.dir(trie, { depth: null });
