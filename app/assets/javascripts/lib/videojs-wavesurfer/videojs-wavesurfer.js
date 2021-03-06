! function(a, b) {
    "function" == typeof define && define.amd ? define(["videojs", "wavesurfer"], b) : "object" == typeof module && module.exports ? module.exports = b(require("video.js"), require("wavesurfer.js")) : a.returnExports = b(a.videojs, a.WaveSurfer)
}(this, function(a, b) {

    console.log('CONST A : ' + typeof a + '  ' + a)
    console.log('CONST B : ' + typeof b + '  ' + b)

    var c = "error",
        d = "warn",
        e = a.getComponent("Component");
    a.Waveform = a.extend(e, {
        constructor: function(a, c) {
            if (e.call(this, a, c), this.waveReady = !1, this.waveFinished = !1, this.liveMode = !1, this.debug = "true" === this.options_.options.debug.toString(), this.msDisplayMax = parseFloat(this.options_.options.msDisplayMax), "live" === this.options_.options.src) try {
                this.microphone = Object.create(b.Microphone), this.microphone.on("deviceError", this.onWaveError.bind(this)), this.liveMode = !0, this.waveReady = !0, this.log("wavesurfer.js microphone plugin enabled.")
            } catch (a) {
                this.onWaveError("Could not find wavesurfer.js microphone plugin!")
            }
            // this.player().one("ready", this.setupUI.bind(this))
            var px = this.player();
            console.log('player is ' + px + ' - ' + typeof px);
            console.log('one =  ' + typeof  $('body').one );

        //    setTimeout(function(){
        //        this.setupUI.bind(this)
        //    }, 1111)
            this.player().one("ready", this.setupUI.bind(this))

        },
        setupUI: function() {
            if (this.player().bigPlayButton.hide(), this.player().usingNativeControls_ === !0 && void 0 !== this.player().tech_.el_ && (this.player().tech_.el_.controls = !1), this.player().currentSrc = function() {
                    return "videojs-wavesurfer"
                }, this.player().options_.controls) {
                this.player().controlBar.show(), this.player().controlBar.el().style.display = "flex", this.player().controlBar.progressControl.hide(), this.player().on("userinactive", function(a) {
                    this.player().userActive(!0)
                });
                var a = [this.player().controlBar.currentTimeDisplay, this.player().controlBar.timeDivider, this.player().controlBar.durationDisplay];
                for (var c in a) void 0 !== a[c] && (a[c].el().style.display = "block", a[c].show());
                void 0 !== this.player().controlBar.remainingTimeDisplay && this.player().controlBar.remainingTimeDisplay.hide(), void 0 !== this.player().controlBar.timeDivider && (this.player().controlBar.timeDivider.el().style.textAlign = "center", this.player().controlBar.timeDivider.el().style.width = "2em"), this.liveMode || this.player().controlBar.playToggle.hide()
            }
            this.surfer = Object.create(b), this.surfer.on("error", this.onWaveError.bind(this)), this.surfer.on("finish", this.onWaveFinish.bind(this)), this.surferReady = this.onWaveReady.bind(this), this.surferProgress = this.onWaveProgress.bind(this), this.surferSeek = this.onWaveSeek.bind(this), this.liveMode || this.setupPlaybackEvents(!0), this.player().on("play", this.onPlay.bind(this)), this.player().on("pause", this.onPause.bind(this)), this.player().on("volumechange", this.onVolumeChange.bind(this)), this.player().on("fullscreenchange", this.onScreenChange.bind(this)), this.startPlayers()
        },
        setupPlaybackEvents: function(a) {
            a === !1 ? (this.surfer.un("ready", this.surferReady), this.surfer.un("audioprocess", this.surferProgress), this.surfer.un("seek", this.surferSeek)) : a === !0 && (this.surfer.on("ready", this.surferReady), this.surfer.on("audioprocess", this.surferProgress), this.surfer.on("seek", this.surferSeek))
        },
        startPlayers: function() {
            var a = this.options_.options;
            this.initialize(a), void 0 !== a.src ? void 0 === this.microphone ? (this.player().loadingSpinner.show(), this.load(a.src)) : (this.player().loadingSpinner.hide(), a.wavesurfer = this.surfer, this.microphone.init(a)) : this.player().loadingSpinner.hide()
        },
        initialize: function(a) {
            this.originalHeight = this.player().options_.height;
            var b = this.player().controlBar.height();
            this.player().options_.controls === !0 && 0 === b && (b = 30), void 0 === a.container && (a.container = this.el()), void 0 === a.waveformHeight ? a.height = this.player().height() - b : a.height = a.waveformHeight, a.splitChannels && a.splitChannels === !0 && (a.height /= 2), this.surfer.init(a)
        },
        load: function(a) {
            a instanceof Blob || a instanceof File ? (this.log("Loading object: " + a), this.surfer.loadBlob(a)) : (this.log("Loading URL: " + a), this.surfer.load(a))
        },
        play: function() {
            this.liveMode ? this.microphone.active ? (this.log("Resume microphone"), this.microphone.play()) : (this.log("Start microphone"), this.microphone.start()) : (this.log("Start playback"), this.player().play(), this.surfer.play())
        },
        pause: function() {
            this.liveMode ? (this.log("Pause microphone"), this.microphone.pause()) : (this.log("Pause playback"), this.waveFinished ? this.waveFinished = !1 : this.surfer.pause(), this.setCurrentTime())
        },
        destroy: function() {
            this.log("Destroying plugin"), this.liveMode && this.microphone && (this.log("Destroying microphone"), this.microphone.destroy()), this.surfer.destroy(), this.player().dispose()
        },
        setVolume: function(a) {
            void 0 !== a && (this.log("Changing volume to: " + a), this.surfer.setVolume(a))
        },
        exportImage: function(a, b) {
            return this.surfer.exportImage(a, b)
        },
        log: function(b, e) {
            this.debug === !0 && (e === c ? a.log.error(b) : e === d ? a.log.warn(b) : a.log(b))
        },
        setCurrentTime: function(a, b) {
            void 0 === a && (a = this.surfer.getCurrentTime()), void 0 === b && (b = this.surfer.getDuration()), a = isNaN(a) ? 0 : a, b = isNaN(b) ? 0 : b;
            var c = Math.min(a, b);
            this.player().controlBar.currentTimeDisplay.contentEl().innerHTML = this.formatTime(c, b)
        },
        setDuration: function(a) {
            void 0 === a && (a = this.surfer.getDuration()), a = isNaN(a) ? 0 : a, this.player().controlBar.durationDisplay.contentEl().innerHTML = this.formatTime(a, a)
        },
        onWaveReady: function() {
            this.waveReady = !0, this.waveFinished = !1, this.liveMode = !1, this.log("Waveform is ready"), this.player().trigger("waveReady"), this.setCurrentTime(), this.setDuration(), this.player().controlBar.playToggle.show(), this.player().loadingSpinner.hide(), this.player().options_.autoplay && this.play()
        },
        onWaveFinish: function() {
            this.log("Finished playback"), this.player().trigger("playbackFinish"), this.player().paused() || (this.player().options_.loop ? (this.surfer.stop(), this.play()) : (this.waveFinished = !0, this.player().pause()))
        },
        onWaveProgress: function(a) {
            this.setCurrentTime()
        },
        onWaveSeek: function() {
            this.setCurrentTime()
        },
        onPlay: function() {
            this.waveReady && this.play()
        },
        onPause: function() {
            this.pause()
        },
        onVolumeChange: function() {
            var a = this.player().volume();
            this.player().muted() && (a = 0), this.setVolume(a)
        },
        onScreenChange: function() {
            var a, b = this.player().isFullscreen();
            if (a = b ? window.outerHeight : this.originalHeight, this.waveReady) {
                if (this.liveMode && !this.microphone.active) return;
                this.surfer.drawer.destroy(), this.surfer.params.height = a - this.player().controlBar.height(), this.surfer.createDrawer(), this.surfer.drawBuffer(), this.surfer.drawer.progress(this.surfer.backend.getPlayedPercents())
            }
        },
        onWaveError: function(a) {
            this.log(a, c), this.player().trigger("error", a)
        },
        formatTime: function(a, b) {
            a = a < 0 ? 0 : a, b = b || a;
            var c = Math.floor(a % 60),
                d = Math.floor(a / 60 % 60),
                e = Math.floor(a / 3600),
                f = Math.floor(b / 60 % 60),
                g = Math.floor(b / 3600),
                h = Math.floor(1e3 * (a - c));
            return (isNaN(a) || a === 1 / 0) && (e = d = c = h = "-"), b > 0 && b < this.msDisplayMax ? (h < 100 && (h = h < 10 ? "00" + h : "0" + h), h = ":" + h) : h = "", e = e > 0 || g > 0 ? e + ":" : "", d = ((e || f >= 10) && d < 10 ? "0" + d : d) + ":", c = c < 10 ? "0" + c : c, e + d + c + h
        }
    });
    var f = function() {
            var a = {
                className: "vjs-waveform",
                tabIndex: 0
            };
            return e.prototype.createEl("div", a)
        },
        g = {
            debug: !1,
            msDisplayMax: 3
        },
        h = function(b) {
            var c = a.mergeOptions(g, b),
                d = this;
            d.waveform = new a.Waveform(d, {
                el: f(),
                options: c
            }), d.el().appendChild(d.waveform.el())
        };
    return a.plugin("wavesurfer", h), h
});