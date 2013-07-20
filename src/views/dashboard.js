window.DashBoardView = Backbone.View.extend({

    tagName: "div",

    className: "",

    events : {
        
    },

    initialize: function () {
    },

    render: function () {
        $(this.el).html($(this.template()));
        this.renderPieCharts();
        return this;
    },

    renderPieCharts: function () {

        $(this.el).find('.easy-pie-chart .number.transactions').easyPieChart({
            animate: 1000,
            size: 75,
            lineWidth: 3,
            barColor: Template.getLayoutColorCode('green')
        });

        $(this.el).find('.easy-pie-chart .number.visits').easyPieChart({
            animate: 1000,
            size: 75,
            lineWidth: 3,
            barColor: Template.getLayoutColorCode('red')
        });
         
        $(this.el).find('.easy-pie-chart .number.bounce').easyPieChart({
            animate: 1000,
            size: 75,
            lineWidth: 3,
            barColor: Template.getLayoutColorCode('yellow')
        });

        $(this.el).find('.easy-pie-chart-reload').click(function(){
            $('.easy-pie-chart .number').each(function() {
                var newValue = Math.floor(100*Math.random());
                $(this).data('easyPieChart').update(newValue);
                $('span', this).text(newValue);
            });
        });
           
        $("#sparkline_bar").sparkline([8,9,10,11,10,10,12,10,10,11,9,12,11,10,9,11,13,13,12], {
            type: 'bar',
            width: '100',
            barWidth: 5,
            height: '55',
            barColor: '#35aa47',
            negBarColor: '#e02222'}
        );

        $("#sparkline_bar2").sparkline([9,11,12,13,12,13,10,14,13,11,11,12,11,11,10,12,11,10], {
            type: 'bar',
            width: '100',
            barWidth: 5,
            height: '55',
            barColor: '#ffb848',
            negBarColor: '#e02222'}
        );

        $("#sparkline_line").sparkline([9,10,9,10,10,11,12,10,10,11,11,12,11,10,12,11,10,12], {
            type: 'line',
            width: '100',
            height: '55',
            lineColor: '#ffb848'
        });
    },
    
});