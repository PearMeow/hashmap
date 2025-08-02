import HashMap from "./hashmap.js";

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(test.entries());
console.log(test.length());
console.log(test.loadFactor);

test.set("apple", "notred");
console.log(test.entries());
console.log(test.length());
console.log(test.loadFactor);

test.set("appl", "notred");
console.log(test.entries());
console.log(test.length());
console.log(test.loadFactor);

console.log(test.get("hat"));
console.log(test.get("aklsdjfkls"));

test.remove("hat");
test.remove("hat");
console.log(test.entries());
console.log(test.length());
console.log(test.loadFactor);

console.log(test.values());
console.log(test.keys());

test.clear();
console.log(test.entries());
console.log(test.length());
console.log(test.loadFactor);
