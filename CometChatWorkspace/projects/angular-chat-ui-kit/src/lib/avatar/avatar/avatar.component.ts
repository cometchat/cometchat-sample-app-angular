import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "avatar",
  templateUrl: "./avatar.component.html",
  styleUrls: ["./avatar.component.scss"],
})
export class AvatarComponent implements OnInit {
  @Input() avatar =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzQxMDAwMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTQlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIxMjAiIGZvbnQtZmFtaWx5PSInSW50ZXInLCBzYW5zLXNlcmlmIiBmb250LXdpZ2h0PSI2MDAiPkE8L3RleHQ+PC9zdmc+";
  @Input() userStatus = "";

  constructor() {}

  ngOnInit() {
    if (this.avatar === undefined || this.avatar === null) {
      this.avatar =
        "https://data-eu.cometchat.io/assets/images/avatars/spiderman.png";

      // console.log("Avatar --> Avatar generated using initails is ");
      // console.log(this.getAvatar("A", "A"));
      // this.avatar = this.getAvatar("A", "A");
    }
  }

  getAvatar = (generator, data) => {
    const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg1.setAttribute("width", "200");
    svg1.setAttribute("height", "200");

    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", "0");
    rect.setAttribute("y", "0");
    rect.setAttribute("width", "200");
    rect.setAttribute("height", "200");
    rect.setAttribute("fill", this.stringToColour(generator));
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", "50%");
    text.setAttribute("y", "54%");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("fill", "white");
    text.setAttribute("font-size", "120");
    text.setAttribute("font-family", "'Inter', sans-serif");
    text.setAttribute("font-wight", "600");
    text.textContent = data;
    svg1.appendChild(rect);
    svg1.appendChild(text);
    let svgString = new XMLSerializer().serializeToString(svg1);

    let decoded = unescape(encodeURIComponent(svgString));
    let base64 = btoa(decoded);

    let imgSource = `data:image/svg+xml;base64,${base64}`;
    return imgSource;
  };
  stringToColour = function (str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = "#";
    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 0xff;
      colour += ("00" + value.toString(16)).substr(-2);
    }
    return colour;
  };
}
