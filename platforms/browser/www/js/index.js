//endpoint's
//http://kidsbank.herokuapp.com/balance/owner


var app = {
    bar: null,
    prog:null,
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function () {
        var self = this;

        var randomValue = 0.55;//Math.random();
        this.bar = new ProgressBar.Circle("#progress", {
            color: '#672592',
            trailColor: '#d9b2f3',
            trailWidth: 12,
            duration: 1400,
            easing: 'bounce',
            strokeWidth: 12,
            from: { color: '#672592', a: 0 },
            to: { color: '#672592', a: 1 },
            // Set default step function for all animate calls
            step: function (state, circle) {
                circle.path.setAttribute('stroke', state.color);
            },
            text: {
                value: (22).toFixed(0) + 'EUR',
                className: 'progress-bar-label',
                autoStyle: true
            }
        });
        
        this.prog = new ProgressBar.Circle("#progress2", {
            color: '#672592',
            trailColor: '#d9b2f3',
            trailWidth: 12,
            duration: 1400,
            easing: 'bounce',
            strokeWidth: 12,
            from: { color: '#672592', a: 0 },
            to: { color: '#672592', a: 1 },
            // Set default step function for all animate calls
            step: function (state, circle) {
                circle.path.setAttribute('stroke', state.color);
            },
            text: {
                value: (8).toFixed(0) + ' EUR',
                className: 'progress-bar-label',
                color:"#7a1fb8",
                autoStyle: true
            }
        });
        
        this.bar.animate(randomValue);
        this.prog.animate(0.2);// Number from 0.0 to 1.0

        function onDisconnect() {
            $(".view").hide();
            $("#selection-view").show();
        }

        $(".open-parent-view").click(function () {
            $(".view").hide();
            $("#loader-view").show();
            $.getJSON("http://kidsbank.herokuapp.com/balance/children", function (data) {
                data.forEach(kid => {
                    var kidElement = $('.kid[value="' + kid.currentAccount.uName.toUpperCase() + '"]');
                    kidElement.find(".kid-name").text(kid.currentAccount.uName);
                    kidElement.find(".kid-balance").text(kid.currentAccount.balance + " " + kid.currentAccount.currency);
                    kidElement.find(".kid-saved").text(kid.savingsAccount.balance + " " + kid.currentAccount.currency);
                    kidElement.find(".view-details").attr("card-account", kid.currentAccount.iban).attr("card-account-balance", kid.currentAccount.balance).attr("saving-account", kid.savingsAccount.iban).attr("saving-account-balance", kid.savingsAccount.balance);
                });
                $(".view").hide();
                $("#parent-view").show();
            }).fail(function () {
                alert("Can't connect to server!");
                onDisconnect();
            });
        });
        $(".open-child-view").click(function () {
            $(".view").hide();
            $("#child-view").show();
            var randomValue = Math.random();
            self.bar.setText((randomValue * 100).toFixed(0) + '%');
            self.bar.animate(randomValue);
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

        $(".view-details").click(function() {
            var kidsName = $(this).attr("value");
            var cardAccount = $(this).attr("card-account");
            var cardAccountBalance = $(this).attr("card-account-balance");
            var savingAccount = $(this).attr("saving-account");
            var savingAccountBalance = $(this).attr("saving-account-balance");

            $("#child-account-detail-view").find(".kids-name").text(kidsName + "S");
            $("#child-account-detail-view").find(".card-iban").text(cardAccount);
            $("#child-account-detail-view").find(".card-account-balance").text(cardAccountBalance);
            $("#child-account-detail-view").find(".saving-iban").text(savingAccount);
            $("#child-account-detail-view").find(".saving-account-balance").text(savingAccountBalance);

            $(".view").hide();
            $("#child-account-detail-view").show();
        });
    },
};
app.initialize();