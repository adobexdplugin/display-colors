const { Text, Rectangle, Polygon, Ellipse, Path } = require("scenegraph");
const { error } = require("./lib/dialogs.js");

function displayColorText(selection) {
  const tnum = selection.items.length;
  for(let i = 0; i < tnum; i++ ) {

    const t = selection.items[i];

    const tType = t instanceof Rectangle || t instanceof Polygon || t instanceof Ellipse || t instanceof Path;
    if (!tType) {
      error("Sorry,", "this plugin supports only Rectangle, Polygon, Ellipse and Path.");
      return;
    }

    // 選択したオブジェクトの色の取得
    const colorValue = t.fill.value;

      // Color Valueが返ってこないのはグラデーションかイメージフィル
      if(!colorValue) {
        error("Sorry,", "this plugin supports only mono fill. You can't select gradient, image fill.");
        return;
      }

    const hexZeroPadding = colorValue.toString(16).padStart(8, '0');
    const hexOpacity = hexZeroPadding.slice(0, 2);
    const hexColor = hexZeroPadding.slice(2, 8);

    const boundsTargetX = t.boundsInParent.x;
    const boundsTargetY = t.boundsInParent.y;

    let hexText = new Text();
    hexText.text = `#${hexColor}`;
    hexText.fill = t.fill;
    hexText.fontSize = 36;
    selection.insertionParent.addChild(hexText);
    hexText.moveInParentCoordinates(boundsTargetX, boundsTargetY);
  }
}

module.exports = {
  commands: {
    displayColors: displayColorText
  }
};
