import number from "./number";
import text from "./text";
import radio from "./radio";
import checkbox from "./checkbox";
import select from "./select";
//使用时，请调用内部的create方法,eg：select.create()
export default {
  text,
  number,
  radio,
  checkbox,
  select
};
