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

        setInterval(function() {
            if($("#child-view").is(":visible")) {
                $.getJSON("http://kidsbank.herokuapp.com/", function (data) {
                    if(data) {
                        $.getJSON("http://kidsbank.herokuapp.com/balance/children", function (data) {
                            var annie = data.find(kid => {
                                return kid.currentAccount.uName.toUpperCase() == "ANNIE";
                            });
                            if(annie.currentAccount.balance < 0.01) {
                                $("#child-view").find(".puppy").show();
                                $("#child-view").find(".budget").hide();
                            } else {
                                $("#child-view").find(".puppy").hide();
                                $("#child-view").find(".budget").show();
                            }
                            $("#child-view").find(".card-account-balance").text(annie.currentAccount.balance + " " + annie.currentAccount.currency);
                            $("#child-view").find(".saving-account-balance").text(annie.savingsAccount.balance + " " + annie.currentAccount.currency);

                            $(".view").hide();
                            $("#child-view").show();
                        }).fail(function () {
                            alert("Can't connect to server!");
                            onDisconnect();
                        });
                    }
                });
            }
        }, 2000);

        //var randomValue = 0.55;//Math.random();
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
                value: (60).toFixed(0) + 'EUR',
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
                value: (30).toFixed(0) + 'EUR',
                className: 'progress-bar-label',
                color:"#7a1fb8",
                autoStyle: true
            }
        });
        
        bikePrec = 5/60;
        tickPrec = 5/30;
        this.bar.animate(bikePrec);
        this.prog.animate(tickPrec);// Number from 0.0 to 1.0

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
                    kidElement.find(".kid-name").text(kid.currentAccount.uName.toUpperCase());
                    kidElement.find(".kid-balance").text(kid.currentAccount.balance + " " + kid.currentAccount.currency);
                    kidElement.find(".kid-saved").text(kid.savingsAccount.balance + " " + kid.currentAccount.currency);
                    kidElement.find(".view-details").attr("currencry", kid.currentAccount.currency).attr("card-account", kid.currentAccount.iban).attr("card-account-balance", kid.currentAccount.balance).attr("saving-account", kid.savingsAccount.iban).attr("saving-account-balance", kid.savingsAccount.balance);
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
            $("#loader-view").show();
            $.getJSON("http://kidsbank.herokuapp.com/ANNIE/balance", function (data) {
                var annie = data;
                if(annie.currentAccount.balance < 0.01) {
                    $("#child-view").find(".puppy").show();
                    $("#child-view").find(".budget").hide();
                } else {
                    $("#child-view").find(".puppy").hide();
                    $("#child-view").find(".budget").show();
                }
                $("#child-view").find(".card-account-balance").text(annie.currentAccount.balance + " " + annie.currentAccount.currency);
                $("#child-view").find(".saving-account-balance").text(annie.savingsAccount.balance + " " + annie.currentAccount.currency);

                $(".view").hide();
                $("#child-view").show();
                self.bar.animate(annie.savingsAccount.balance/bikePrec);
                self.prog.animate(annie.savingsAccount.balance/tickPrec);
            }).fail(function () {
                alert("Can't connect to server!");
                onDisconnect();
            });
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
        
        $("#1progress").click(function(){
            //bar.animate(1);
            setTimeout(function(){
                $(".view").hide();
                $("#child-goal-achieved-view").show();
                
            }, 1000);
        });
        
        $("#2progress").click(function(){
            //prog.animate(1);
            setTimeout(function(){
                $(".view").hide();
                $("#child-goal-achieved-view").show();
                
            }, 3000);
        });

        $(".view-details").click(function() {
            $(".view").hide();
            $("#loader-view").show();
            var kidsName = $(this).attr("value");
            var cardAccount = $(this).attr("card-account");
            var cardAccountBalance = $(this).attr("card-account-balance");
            var currency = $(this).attr("currency");
            var savingAccount = $(this).attr("saving-account");
            var savingAccountBalance = $(this).attr("saving-account-balance");

            $.getJSON("http://kidsbank.herokuapp.com/balance/owner", function (data) {
                $("#child-account-detail-view").find(".kids-name").text(kidsName);
                $("#child-account-detail-view").find(".card-iban").text(cardAccount);
                $("#child-account-detail-view").find(".card-account-balance").text(cardAccountBalance + " " + currency);
                $("#child-account-detail-view").find(".saving-iban").text(savingAccount);
                $("#child-account-detail-view").find(".saving-account-balance").text(savingAccountBalance);
                $("#child-account-detail-view").find(".give-money-button").attr("name", kidsName);
                $("#child-account-detail-view").find(".parent-account-balance").text(data.balance + " " + data.currency);
                $(".view").hide();
                $("#child-account-detail-view").show();
            }).fail(function () {
                alert("Can't connect to server!");
                onDisconnect();
            });
        });

        $(".give-money-button").click(function() {
            var name = $(this).attr("name");
            var amount = $(".give-money-amount").val();
            var days = $(".give-money-days").val();
            $(".view").hide();
            $("#loader-view").show();
            $.getJSON("http://kidsbank.herokuapp.com/" + name + "/pay/" + amount + "/" + days, function (data) {
                $.getJSON("http://kidsbank.herokuapp.com/balance/children", function (data) {
                    data.forEach(kid => {
                        var kidElement = $('.kid[value="' + kid.currentAccount.uName.toUpperCase() + '"]');
                        kidElement.find(".kid-name").text(kid.currentAccount.uName.toUpperCase());
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
            }).fail(function () {
                alert("Can't connect to server!");
                onDisconnect();
            });
        });
    },
};
app.initialize();