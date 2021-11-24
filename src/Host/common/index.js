import $ from "jquery";

export const handleCursor = () => {
  const cursor = document.getElementById("circle");
  $(document).mousemove((e) => {
    if (cursor) {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    }
  });
};

export const handleEnterMouse = () => {
  const cursor = document.getElementById("circle");
  if (cursor) {
    cursor.style.width = "60px";
    cursor.style.height = "60px";
  }
};
export const handleEnterLeave = () => {
  const cursor = document.getElementById("circle");
  if (cursor) {
    cursor.style.width = "20px";
    cursor.style.height = "20px";
  }
};
