import hc from "html2canvas";

export function draw(dom) {
  return new Promise((resolve, reject) => {
    hc(dom).then(canvas => {
      console.log(canvas);
      resolve(canvas);
    });
  });
}
