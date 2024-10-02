/**
 * create a very visible spaced-out comment in a box, like this one:
 *
 * ```
 * ///////////////////////////////////////////////////
 * ///              f u n c t i o n s              ///
 * ///////////////////////////////////////////////////
 * ```
 */
export function borderify(text, { char = "/", lineLength = 73 } = {}) {
  if (lineLength % 2 != 1) throw Error("lineLength must be an odd number");
  if (char.length !== 1) throw Error("`char` param has to be a single char");

  const horizontalBorder = char.repeat(lineLength);
  const verticalBorder = char.repeat(3);
  const preText = verticalBorder + " ";
  const postText = " " + verticalBorder;

  const spacedOutText = text.split("").join(" ");

  const padSize =
    (lineLength - preText.length - postText.length - spacedOutText.length) / 2;

  if (padSize < 0)
    throw Error(`lineLength ${lineLength} is too short "${text}"`);

  const paddingSpaces = Array(padSize).fill(" ").join("");

  return [
    horizontalBorder,
    preText + paddingSpaces + spacedOutText + paddingSpaces + postText,
    horizontalBorder,
  ].join("\n");
}

// console.log(borderify('hello', {char: '#'}));
