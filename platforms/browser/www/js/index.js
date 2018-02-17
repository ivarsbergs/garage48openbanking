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

        function onDisconnect() {
            $(".view").hide();
            $("#selection-view").show();
        }

        $(".open-parent-view").click(function () {
            $(".view").hide();
            $("#parent-view").show();
        });
        $(".open-child-view").click(function () {
            $(".view").hide();
            $("#child-view").show();
        });
        $(".open-selection-view").click(function () {
            $(".view").hide();
            $("#selection-view").show();
        });
        $(".open-parent-account-view").click(function () {
            $(".view").hide();
            $("#loader-view").show();
            $.getJSON("http://kidsbank.herokuapp.com/balance/owner", function (data) {
                $(".view").hide();
                $("#parent-account-view").find(".iban").text(data.iban);
                $("#parent-account-view").find(".account-balance").text(data.balance);
                $("#parent-account-view").find(".currency").text(data.currency);
                $("#parent-account-view").show();
                var randomValue = Math.random();
                self.bar.setText((randomValue * 100).toFixed(0) + '%');
                self.bar.animate(randomValue);
            }).fail(function () {
                alert("Can't connect to server!");
                onDisconnect();
            });
        });
        $(".close-kid").click(function () {
            $('.kid[value="' + $(this).attr("value") + '"]').hide();
        });
    },
};
app.initialize();