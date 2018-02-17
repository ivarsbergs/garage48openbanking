//endpoint's
//http://kidsbank.herokuapp.com/balance/owner


var app = {
    bar: null,
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function () {
        var self = this;

        var randomValue = Math.random();
        this.bar = new ProgressBar.Circle("#progress", {
            color: '#333333',
            trailColor: '#EEEEEE',
            trailWidth: 1,
            duration: 1400,
            easing: 'bounce',
            strokeWidth: 12,
            from: { color: '#539124', a: 0 },
            to: { color: '#9EC908', a: 1 },
            // Set default step function for all animate calls
            step: function (state, circle) {
                circle.path.setAttribute('stroke', state.color);
            },
            text: {
                value: (randomValue * 100).toFixed(0) + '%',
                className: 'progress-bar-label',
                autoStyle: true
            }
        });
        this.bar.animate(randomValue);  // Number from 0.0 to 1.0

        $(".open-parent-view").click(function () {
            $(".view").hide();
            $("#loader-view").show();
            $.getJSON("http://kidsbank.herokuapp.com/balance/owner", function (data) {
                $(".view").hide();
                $("#parent-view").show();
                var randomValue = Math.random();
                self.bar.setText((randomValue * 100).toFixed(0) + '%');
                self.bar.animate(randomValue);
            });
        });
        $(".open-child-view").click(function () {
            $(".view").hide();
            $("#child-view").show();
        });
        $(".open-parent-child-view").click(function () {
            $("#parent-child-view").find(".child-name").text($(this).attr("value"));
            $(".view").hide();
            $("#parent-child-view").show();
        });
    },
};
app.initialize();