window.onload = function () {
    if (!localStorage.noLoading) {
        let notifications = new Notifications;
        notifications.switches[1].click();
        setTimeout(function () {
            let block = document.querySelector(".blockNotifications");
            block.style.display = "block";
        }, 5000)
    }
    else {
        let notifications = document.querySelector(".blockNotifications");
        notifications.style.display = "none";
    }
}


class Notifications {
    constructor() {
        this.index = null;
        this.closeButton = null;
        this.switches = null;
        this.text = null;
        this.input = null;
        this.notificationsText = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt dignissim sagittis. Proin orci quam, placerat sed magna in, consectetur mattis nibh.",
            "Proin a tristique metus. Aliquam vitae eleifend lorem. Curabitur porttitor urna non massa vulputate, non volutpat ante aliquam. ",
            "Nullam ac vehicula ante. Morbi nisl felis, facilisis id tortor eget, mollis mollis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "Pellentesque ultrices suscipit faucibus. Curabitur nec eros in nisi efficitur rutrum sed nec massa. Donec varius sapien ut lectus molestie, at mollis eros iaculis.",
            "Nullam facilisis auctor sollicitudin. Nam volutpat nisl ut molestie laoreet.",
            "Nullam tincidunt neque at ligula gravida, sed pellentesque velit aliquam. Integer commodo tellus vitae turpis imperdiet finibus."]
        this.start();
    }

    start() {
        this.closeButton = document.getElementById("closeNotifications");
        let switchesBlock = document.querySelector(".switches");
        this.switches = switchesBlock.getElementsByTagName("button");
        this.text = document.querySelector(".inf");
        this.input = document.getElementById("input");
        this.addEvent();
    }

    addEvent() {

        let that = this;
        this.closeButton.addEventListener("click", function () {
            let block = document.querySelector(".blockNotifications");
            block.style.display = "none";
            if (that.input.checked) {
                localStorage.setItem("noLoading", "true");
            }
        })

        for (let i = 1; i < that.switches.length - 1; i++)(function (i) {
            that.switches[i].addEventListener("click", function () {
                that.index = i;
                that.handler(that, i);
            })
        })(i);


        this.switches[0].addEventListener("click", function () {
            if (that.index == 1) that.index = 7;
            that.handler(that, that.index - 1);
            that.index = that.index - 1;
        });

        this.switches[7].addEventListener("click", function () {
            if (that.index == 6) that.index = 0;
            that.handler(that, that.index + 1);
            that.index = that.index + 1;
        })

        document.onkeyup = function (e) {
            if (e.keyCode == 37) {
                that.switches[0].click();
            }
            if (e.keyCode == 39) {
                that.switches[7].click();
            }
            if (e.keyCode == 27) {
                that.closeButton.click();
            }
        }
    }
    handler(that, i) {
        for (let y = 1; y < that.switches.length - 1; y++) {
            that.switches[y].classList.remove("clickbutton");

        }
        that.text.innerHTML = that.notificationsText[i - 1];
        that.switches[i].classList.add("clickbutton");
    }
}