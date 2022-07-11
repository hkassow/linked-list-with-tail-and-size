class LinkedList {
  constructor(head = null) {
    this.head = head;
    this.tail = head
    this.size = 0
    this.iterate(currNode => {
      this.size ++;
      if (currNode.next === null) {
        this.tail = currNode
        return true
      }
    })
  }
  reduzeSizeBy1() {
    if (this.size !== 0) {
      this.size --;
    }
  }

  iterate(callback) {
    let count = 0;
    let temp = this.head;

    while (temp !== null) {
      const result = callback(temp, count);

      if (result === true) {
        return temp;
      }

      ++count;
      temp = temp.next;
    }

    return this.head;
  }

  // print each node's value on its own line
  print() {
    this.iterate(node => console.log(node.value));
  }

  // find the node with the target value and return it
  find(target) {
    let result = null;

    this.iterate(node => {
      if (node.value === target) {
        result = node;

        return true;
      }
    });

    return result;
  }

  // add the node to the start of the list, no nodes should be removed
  addFirst(node) {
    node.next = this.head;
    this.head = node;
    this.size ++;

    if (this.tail === null) {
      this.iterate(currNode => {
        if (currNode.next === null){
          this.tail = currNode
          return true
        } else{
          this.size ++
        }
      })
    }


  }

  // add node to end of list
  addLast(node) {
    if (this.head === null) {
      this.head = node;
    } else {
      this.tail.next = node
    }
    this.tail = node

    this.size ++
    let temp = node
    while (temp.next != null) {
      temp = temp.next
      this.size ++
    }
  }

  // remove the first Node in the list and update head
  // and return the removed node
  removeFirst() {
    const oldHead = this.head;
    if (this.head !== null) {
      if (this.tail === this.head) {
        this.tail = null
      }
      this.head = this.head.next;
      this.reduzeSizeBy1();
    }

    return oldHead;
  }

  // remove the tail node,
  // return the node 
  removeLast() {
    if (this.head === null || this.head.next === null) {
      return this.removeFirst();
    }
    let result
    this.iterate(node => {
      if (node.next.next === null) {
        result = node.next
        node.next = null
        this.tail = node
        return true
      }
    })
    this.reduzeSizeBy1();
    return result
  }

  // replace the node at the given index with the given node
  replace(idx, node) {
    if (idx === 0) {
      this.removeFirst();
      this.addFirst(node);
      return node;
    }

    this.iterate((currNode, count) => {
      if (count === idx - 1) {
        node.next = currNode.next.next;
        currNode.next = node;

        return true;
      }
    });
    if (node.next === null){
      this.tail = node
    }
    this.size ++;
    return node;
  }

  // insert the node at the given index
  // no existing nodes replaced
  insert(idx, node) {
    if (idx === 0) {
      this.addFirst(node);
      return;
    }
    this.size ++;
    this.iterate((currNode, count) => {
      if (count === idx - 1) {
        const oldNext = currNode.next;
        currNode.next = node;
        node.next = oldNext;
        if (node.next === null){
          this.tail = node
        }
        return true;
      }
    });
  }

  // remove the node at the given index, and return it
  remove(idx) {
    if (idx === 0) {
      return this.removeFirst();
    }

    let oldNode = null;
    this.reduzeSizeBy1()
    this.iterate((node, count) => {
      if (count === idx - 1) {
        oldNode = node.next;
        node.next = node.next.next;
        if (node.next === null) {
          this.tail = node
        }
      }
    }); 

    return oldNode;
  }

  clear() {
    this.head = null;
    this.tail = null
    this.size = 0;
  }
}

class Node {
  constructor(value = null, next = null) {
    this.value = value;
    this.next = next;
  }
}

let head = new Node('one', new Node('two', new Node('three', new Node('four'))));
let linkedList = new LinkedList(head);
console.log(linkedList.tail)
console.log(linkedList.head)




if (require.main === module) {
  let head = new Node('one', new Node('two', new Node('three', new Node('four'))));
  let list = new LinkedList(head);
  let emptyList = new LinkedList();
  let oneItemList = new LinkedList(new Node('just one'));

}

module.exports = {
  Node, LinkedList
};
