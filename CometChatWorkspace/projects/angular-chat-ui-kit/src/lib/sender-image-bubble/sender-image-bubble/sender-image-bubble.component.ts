import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
@Component({
  selector: "sender-image-bubble",
  templateUrl: "./sender-image-bubble.component.html",
  styleUrls: ["./sender-image-bubble.component.css"],
})
export class SenderImageBubbleComponent implements OnInit {
  @Input() MessageDetails = null;
  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  timer = null;
  messageFrom = "sender";

  messageAssign = Object.assign({}, this.MessageDetails, {
    messageFrom: this.messageFrom,
  });

  message = this.messageAssign;
  imageUrl = "";
  fullScreenView = false;

  constructor() {}

  ngOnInit() {
    this.setImage();
  }

  setImage() {
    if (this.MessageDetails.hasOwnProperty("metadata")) {
      const metadata = this.MessageDetails.metadata;
      const injectedObject = metadata["@injected"];
      if (injectedObject && injectedObject.hasOwnProperty("extensions")) {
        const extensionsObject = injectedObject["extensions"];
        if (
          extensionsObject &&
          extensionsObject.hasOwnProperty("thumbnail-generation")
        ) {
          const thumbnailGenerationObject =
            extensionsObject["thumbnail-generation"];

          //mq harcoded value is used until theme is not passed change it after
          const mq = window.matchMedia(
            "(min-width:360px) and (max-width: 767px)"
          );

          //when theme is passed use this mq
          //const mq = window.matchMedia(this.MessageDetails.theme.breakPoints[0]);
          mq.addListener(() => {
            const imageToDownload = this.chooseImage(thumbnailGenerationObject);
            let img = new Image();
            img.src = imageToDownload;
            img.onload = () => {
              this.imageUrl = img.src;
              console.log("listner");
            };
          });

          const imageToDownload = this.chooseImage(thumbnailGenerationObject);
          let img = new Image();
          img.src = imageToDownload;
          img.onload = () => {
            this.imageUrl = img.src;
            //  console.log("src ", img.src);
            //console.log("src_ ", Object.assign({}, { img: img.src }));

            URL.revokeObjectURL(img.src);
          };
          // console.log("imgtodownload ", imageToDownload);
          //console.log("img_ ", Object.assign({}, { img: imageToDownload }));

          // this.downloadImage(imageToDownload)
          //   .then((response) => {
          //     const url = URL.createObjectURL(response);
          //     //   console.log("_url ", url);

          //     let img = new Image();
          //     img.src = imageToDownload;
          //     img.onload = () => {
          //       this.imageUrl = img.src;
          //       //  console.log("src ", img.src);
          //       //console.log("src_ ", Object.assign({}, { img: img.src }));

          //       URL.revokeObjectURL(img.src);
          //     };
          //   })
          //   .catch((error) => console.error(error));
        }
      }
    } else {
      this.setMessageImageUrl();
    }
  }

  chooseImage(thumbnailGenerationObject) {
    //console.log("thumbnail ", thumbnailGenerationObject);

    const smallUrl = thumbnailGenerationObject["url_small"];
    const mediumUrl = thumbnailGenerationObject["url_medium"];

    //mq harcoded value is used until theme is not passed change it after
    const mq = window.matchMedia("(min-width:360px) and (max-width: 767px)");

    //when theme is passed use this mq
    //const mq = window.matchMedia(this.MessageDetails.theme.breakPoints[0]);

    let imageToDownload = mediumUrl;
    if (mq.matches) {
      imageToDownload = smallUrl;
    }

    return imageToDownload;
  }

  setMessageImageUrl() {
    let img = new Image();
    img.src = this.MessageDetails.data.url;
    img.onload = () => {
      this.imageUrl = img.src;
      // console.log("src ",img.src);
    };
  }

  // downloadImage(imgUrl) {
  //   const promise = new Promise((resolve, reject) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.open("GET", imgUrl, true);
  //     xhr.responseType = "blob";
  //     xhr.onload = () => {
  //       if (xhr.readyState === 4) {
  //         if (xhr.status === 200) {
  //           this.timer = null;
  //           resolve(xhr.response);
  //         } else if (xhr.status === 403) {
  //           this.timer = setTimeout(() => {
  //             this.downloadImage(imgUrl)
  //               .then((response) => resolve(response))
  //               .catch((error) => reject(error));
  //           }, 800);
  //         }
  //       } else {
  //         reject(xhr.statusText);
  //       }
  //     };
  //     xhr.onerror = (event) => reject(new Error("There was a network error."));
  //     xhr.ontimeout = (event) =>
  //       reject(new Error("There was a timeout error."));
  //     xhr.send();
  //   });
  //   return promise;
  // }

  open() {
    this.actionGenerated.emit({
      type: "viewActualImage",
      payLoad: { ...this.message, ...this.MessageDetails },
    });
  }
}
