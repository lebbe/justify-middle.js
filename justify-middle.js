/**
 *
 */
;(function(window, $) {
    /* The elements in DOM that should be justify-middle.
     * Contains an array of objects with the fields element and
     * options.
     */
    var justifyMiddleElements = [];

    function justifyMiddle($elem, options) {
        options = $.extend({
            minElements: 1
        }, options);

        var $middle = $('[data-justify-middle]', $elem);
        
        // First remove previous middle span if existing
        $middle.children().appendTo($elem);
        $middle.remove();

        var $target = $elem.children();
        
        // Then create a new middle span
        $middle = $('<span data-justify-middle style="display: inline-block;text-align: center;width: 100%;"></span>');
        $middle.appendTo($elem);

        var offsetTop = $target.last().offset().top;
        for(var i = $target.length - 1; i > 0; i--) {
            var $i = $($target.get(i));
            if($i.offset().top === offsetTop) {
                $middle.prepend($i);
            }
        }

        // The element should have text-align justify in css either way
        // because it makes a nice fall-back if javascript is not supported
        // or is not run because of an error.
        // (But it might be cases where designer for instance wants
        //  text-align: center instead, therefore we set it dynamically as
        // well).
        $elem.css('text-align', 'justify');
        
        if($middle.children().length < options.minElements) {
            $middle.css('text-align', 'left');
        }
    }
    $['fn']['justifyMiddle'] = function (options) {
		this.each(function(){
            justifyMiddle($(this), options);
            justifyMiddleElements.push({element: this, options: options});
        });
	};
    
    $(window).on('resize', function() {
        justifyMiddleElements.forEach(function(a){
            justifyMiddle($(a.element), a.options);
        });
    });
})(this, this['jQuery']);
