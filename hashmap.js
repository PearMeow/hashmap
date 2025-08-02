function hash(key, capacity) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
        hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }

    return hashCode;
}

class Node {
    constructor(key = null, value = null, next = null) {
        this.key = key;
        this.value = value;
        this.next = next;
    }
}

export default class HashMap {
    constructor() {
        this.capacity = 16;
        this._length = 0;
        this.loadFactor = 0;
        this.buckets = [];
    }
    set(key, value) {
        let index = hash(key, this.capacity);
        if (this.buckets[index] === undefined) {
            this.buckets[index] = new Node(key, value);
            ++this._length;
        } else {
            let currNode = this.buckets[index];
            while (currNode.next !== null) {
                if (currNode.key === key) {
                    break;
                }
                currNode = currNode.next;
            }
            if (currNode.key === key) {
                currNode.value = value;
            } else {
                currNode.next = new Node(key, value);
                ++this._length;
            }
        }
        this.loadFactor = this.length() / this.capacity;
        if (this.length() / this.capacity > 0.75) {
            this.grow();
        }
    }
    grow() {
        this.capacity *= 2;
        this._length = 0;
        let oldBuckets = this.buckets;
        this.buckets = [];
        for (let node of oldBuckets) {
            while (node !== null && node !== undefined) {
                this.set(node.key, node.value);
                node = node.next;
            }
        }
        this.loadFactor = this.length() / this.capacity;
    }
    get(key) {
        let index = hash(key, this.capacity);
        if (this.buckets[index] === undefined) {
            return null;
        }
        let currNode = this.buckets[index];
        while (currNode !== null) {
            if (currNode.key === key) {
                return currNode.value;
            }
            currNode = currNode.next;
        }
        return null;
    }
    has(key) {
        return this.get(key) !== null;
    }
    remove(key) {
        let index = hash(key, this.capacity);
        if (this.buckets[index] === undefined || this.buckets[index] === null) {
            return false;
        }
        let currNode = this.buckets[index];
        if (currNode.key === key) {
            this.buckets[index] = currNode.next;
            --this._length;
            this.loadFactor = this.length() / this.capacity;
            return true;
        }
        while (currNode.next !== null) {
            if (currNode.next.key === key) {
                currNode.next = currNode.next.next;
                --this._length;
                this.loadFactor = this.length() / this.capacity;
                return true;
            }
        }
        return false;
    }
    length() {
        return this._length;
    }
    clear() {
        this.capacity = 16;
        this.loadFactor = 0;
        this._length = 0;
        this.buckets = [];
    }
    keys() {
        const arr = [];
        for (let node of this.buckets) {
            while (node !== null && node !== undefined) {
                arr.push(node.key);
                node = node.next;
            }
        }
        return arr;
    }
    values() {
        const arr = [];
        for (let node of this.buckets) {
            while (node !== null && node !== undefined) {
                arr.push(node.value);
                node = node.next;
            }
        }
        return arr;
    }
    entries() {
        const arr = [];
        for (let node of this.buckets) {
            while (node !== null && node !== undefined) {
                let pair = [];
                pair.push(node.key);
                pair.push(node.value);
                arr.push(pair);
                node = node.next;
            }
        }
        return arr;
    }
}
