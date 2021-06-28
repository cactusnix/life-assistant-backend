// const text = $context.text;
const image = $context.image;
console.log(image);
$share.wechat(image);

let tree = {
  o,
};

let mapTree = (tree) => {
  if (!tree.next) {
    return;
  }
  console.log(tree, "current");
  tree.id = tree.id + 1;
  mapTree(tree.next);
};
console.log(tree);
console.log(mapTree(tree));

const arr1 = [
  {
    name: "dx1",
    label: "dx1",
    options: [
      {
        value: "a",
      },
      {
        value: "e",
      },
    ],
  },
  {
    name: "dx2",
    label: "dx2",
    options: [
      {
        value: "c",
      },
      {
        value: "d",
      },
    ],
  },
];

const arr2 = [
  {
    name: "3",
    label: "dx1",
    value: "b",
  },
  {
    name: "33",
    label: "dx2",
    value: "d",
  },
];

const arr3 = arr2.filter((v) => {
  if (v.name.includes("dx")) {
    return arr1.find(
      (it) =>
        it.name === v.name &&
        it.label === v.label &&
        it.options.find((item) => item.value === v.value)
    );
  }
  return false;
});
console.log(arr3);

const list = [
  {
    key: "a",
    value: 1,
  },
  {
    key: "b",
    value: 2,
  },
];

list.map((it, index) => {
  console.log(it, index);
});
