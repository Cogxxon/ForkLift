(function($){

/***************************************
 * ForkLift v0.1 Beta
 * Created by garvey.snow on 4/14/2015.
 **************************************/


    object.prototype.ForkLift = {};
    /**********************************************************************
     * Creates the relivant html objects to allow the opening of window-div
     * @param f
     * @constructor
     */
    ForkLift.CreateHtmlObjects = function CreateWindowObjects(dimen)
    {
        /**
         * starting id = 500
         * For tracking what windows are open and to allow no duplicate windows
         * @type {number} */
        var statID = 500;

        /**
         * Window Inner Html Elements
         * @type {string} window_innder_objects */
        var window_innder_objects = '<div class="inner-window">';
            window_innder_objects +=    '<div class="window-header">';
            window_innder_objects +=    '<div class="controls">';
            window_innder_objects +=        '<ul>';
            window_innder_objects +=            '<li class="control pin">o</li>';
            window_innder_objects +=            '<li class="control minimize">-</li>';
            window_innder_objects +=            '<li class="control close">x</li>';
            window_innder_objects +=        '</ul>';
            window_innder_objects +=    '</div>';
            window_innder_objects +=        '<div class="window-title"></div>';
            window_innder_objects +=    '</div>';
            window_innder_objects +=    '<div class="clear-fix"></div>';
            window_innder_objects +=    '<div class="content-frame"></div>';
            window_innder_objects += '</div>';
        /**
         * Create DOM Element{DIV}
         * @type {HTMLElement} windowElem */
        var windowElem = document.createElement('div');

        /**
         * Assigns the classnames
         * @type {string} windowElem */
        windowElem.className = 'window-size-' + dimen.wSize; windowElem.className += ' window';

        /**********************************
         * if id is not set, genarate one */
        if ( dimen.hasOwnProperty('id') ) 
        { 
            windowElem.id = dimen.id; 
        }
        else 
        { 
            windowElem.id = this.RequestWindowId(); 
        }
        /**********************************************
         * import the html objects in to container div
         * @type {string} ****************************/
        windowElem.innerHTML = window_innder_objects;

        /***************************************
         * Append the element to the DOM body */
        if(document.getElementById(windowElem.id)){
            /* do nothing */}else{document.body.appendChild(windowElem);
                                 }

        /*****************************
         *  Make the window daggable */
        this.MakeDraggable(windowElem);

        /*****************************************************************
         * Find div with class title and add the custom title text to it */
        $(windowElem).find('.window-title').html(f.title).show()

        // find .close class element and add a click event listener
        $(windowElem).find('.close').on('click', function ()
        {
            $(windowElem).toggle(
                                    "fast",
                                    function ()
                                    {
                                        $(windowElem).remove();
                                    }
                                );
        });
        // add window open close animation
        $(windowElem).toggle("fast");

        $(windowElem).on('click', function () {
            $(this).css('z-index', window_zIndex++);
        })


    }/**End Function::CreateWindowObjects */


    /***********************************
     * Object function RequestWindowId
     * @returns {string}
     *
     *
     *
     */
    ForkLift.RequestWindowId = function()
    {
            // The first window to open
            this.statID += 1;
            return 'win-inst-' + statID;
    }


    /***********************************
     * Object Function MakeDraggable
     * @param elem
     * @constructor
     *
     *
     *
     *
     */
    ForkLift.MakeDraggable = function (elem)
    {
        $(elem).on
        (
                    'mouseover', function ()
                    {
                        $(this).draggable({handle: '.window-header'})
                    }
        );
    }

    ForkLift.createWindow = function(f) {

        this.CreateHtmlObjects(f);
    }

    /** Return Object */
        return obj;
    
})/*end SEF/