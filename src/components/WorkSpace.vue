<template>
  <div class="hell">
    <div class="d-flex justify-content-center flex-nowrap mt-5">
      <div class="p-2">
        <button @click="rotationLeft()" class="d-block bg-white border-0 mt-5">
          <fa icon="arrow-rotate-right" class="fs-3 px-5" />
        </button>
        <button @click="rotationRight()" class="d-block bg-white border-0 mt-3">
          <fa icon="arrow-rotate-left" class="fs-3 px-5" />
        </button>

        <button class="bg-white border-0 mt-5" @click="rotation()">
          <fa icon="arrows-rotate" class="fs-3 px-5" />
        </button>
      </div>
      <div class="p-2 flex-grow-1">
        <div
          class="blank mb-5"
          ref="printMe"
          :style="{
            'background-image': `url(${bgPreview})`,
          }"
        >
          <img
            draggable="false"
            :src="filePreview"
            ref="myimg"
            id="im"
            :class="{ flipped, rotatedleft, rotatedright }"
            :style="{ top: imgTop, left: imgLeft }"
          />
        </div>
        <div class="d-flex justify-content-center">
          <button @click="up()" class="bg-dark border-0 mx-3">
            <fa icon="caret-up" class="px-2 text-white" />
          </button>

          <button @click="down()" class="bg-dark border-0 mx-3">
            <fa icon="caret-down" class="px-2 text-white" />
          </button>
          <button @click="left()" class="bg-dark border-0 mx-3">
            <fa icon="caret-left" class="px-2 text-white" />
          </button>
          <button @click="right()" class="bg-dark border-0 mx-3">
            <fa icon="caret-right" class="px-2 text-white" />
          </button>
        </div>
        <div class="w-25 bg-info mt-1">
          <a
            href="#"
            class="btn btn-info text-white px-2 w-100"
            @click="upload()"
            >رفع النشاط و تسليمه</a
          >
        </div>
        <div class="bg-secondary mx-auto w-25">
          <a
            href="#"
            class="btn btn-secondary text-white w-100"
            @click="print()"
            >Save Image To My PC</a
          >
        </div>
      </div>
      <div class="p-2">
        <label class="custom-file-upload d-block bg-pink mt-5 w-75 pe-5 ps-4">
          <input
            type="file"
            name="image"
            @input="selectImgFile"
            ref="fileInput"
            accept="image/*"
          />
          <fa icon="1" style="color: #e46ee0" class="d-block mx-2 fs-1" />

          <fa icon="image" class="fs-1 text-white mx-2 d-block" />
        </label>

        <label class="custom-bg-upload d-block bg-green w-75 mt-3 pe-5 ps-4">
          <input
            type="file"
            name="background"
            @input="selectImgFile"
            ref="bgInput"
            accept="image/*"
          />
          <fa icon="2" style="color: #5fc36f" class="d-block mx-2 fs-1" />
          <fa icon="display" class="fs-1 text-success mx-2 d-block" />
        </label>
      </div>
    </div>
    <img :src="output" />
  </div>
</template>

<script>
import html2canvas from "html2canvas";

export default {
  data: function () {
    return {
      imge: null,
      filePreview: null,
      bgPreview: null,
      url: "http://localhost:8000/uploads/images/",
      form: new FormData(),
      output: null,
      don: false,
      imgTop: 0,
      imgLeft: 0,
      deg: 0,
      flipped: false,
      rotatedleft: false,
      rotatedright: false,
    };
  },

  methods: {
    rotation() {
      this.flipped = !this.flipped;
      this.rotatedleft = false;
      this.rotatedright = false;
    },
    rotationLeft() {
      this.rotatedleft = !this.rotatedleft;
      this.flipped = false;
      this.rotatedright = false;
    },
    rotationRight() {
      this.rotatedright = !this.rotatedright;
      this.flipped = false;
      this.rotatedleft = false;
    },
    right() {
      console.log("hi");
      this.imgLeft = parseInt(this.imgLeft) + 5 + "%";
      if (parseInt(this.imgLeft) > 100) {
        this.imgLeft = 0;
      }
    },
    down() {
      this.imgTop = parseInt(this.imgTop) + 5 + "%";
      if (parseInt(this.imgTop) > 100) {
        this.imgTop = 0;
      }
    },
    up() {
      this.imgTop = parseInt(this.imgTop) - 5 + "%";
      if (parseInt(this.imgTop) <= 0) {
        this.imgTop = 0 + "%";
      }
    },
    left() {
      this.imgLeft = parseInt(this.imgLeft) - 5 + "%";
      if (parseInt(this.imgLeft) <= 0) {
        this.imgLeft = 0;
      }
    },

    selectImgFile() {
      let fileInput = this.$refs.fileInput;
      let imgFile = fileInput.files;

      let bgInput = this.$refs.bgInput;
      let bgFile = bgInput.files;

      if (imgFile && imgFile[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.filePreview = e.target.result;
        };
        reader.readAsDataURL(imgFile[0]);
        this.$emit("fileInput", imgFile[0]);

        document.getElementById("im").style.width = "160px";
        document.getElementById("im").style.height = "160px";
      }

      if (bgFile && bgFile[0]) {
        let bgreader = new FileReader();
        bgreader.onload = (e) => {
          this.bgPreview = e.target.result;
          console.log(this.bgPreview);
        };
        bgreader.readAsDataURL(bgFile[0]);
        this.$emit("bgInput", bgFile[0]);
      }
    },
    //to append image in formdata and send in a post request

    print() {
      const screenshotTarget = this.$refs.printMe;
      html2canvas(screenshotTarget).then((canvas) => {
        const base64 = canvas.toDataURL("image/png");
        console.log(canvas);
        var anchor = document.createElement("a");
        anchor.setAttribute("href", base64);
        anchor.setAttribute("download", "my-image");
        anchor.click();
        anchor.remove();
        this.form.append("img", base64);
        console.log(this.form);
        this.imge = this.form;
      });
    },
    upload() {
      console.log(this.imge);
      window.axios
        .post("http://127.0.0.1:8000/api/upload", this.imge)
        .then((res) => console.log(res));
      console.log(this.form);
    },
  },
  name: "WorkSpace",
};
</script>

<style>
.blank {
  height: 400px;
  border: 7px solid;
  border-image: linear-gradient(
      90deg,
      rgba(136, 41, 121, 1) 3%,
      rgba(41, 43, 136, 1) 6%,
      rgba(47, 100, 127, 1) 25%,
      rgba(28, 60, 8, 1) 41%,
      rgba(132, 164, 66, 1) 61%,
      rgba(129, 34, 149, 1) 92%,
      rgba(149, 34, 114, 1) 98%
    )
    1;
}
input[type="file"] {
  display: none;
}
.custom-file-upload {
  cursor: pointer;
  padding: 10px;
  box-shadow: 8px -1px 3px -3px #b569bb;
  border-radius: 4px 17px 17px 4px;
}
.custom-bg-upload {
  cursor: pointer;
  padding: 10px;
  box-shadow: 8px -1px 3px -3px #399955;
  border-radius: 4px 17px 17px 4px;
}
#im {
  position: absolute;
}
.blank {
  position: relative;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover00;
}

.flipped {
  transform: rotate(180deg);
}
.rotatedleft {
  transform: rotate(90deg);
}
.rotatedright {
  transform: rotate(-90deg);
}
.bg-pink {
  background-color: #eb76f4;
}
.bg-green {
  background-color: #6ded93;
}
</style>
