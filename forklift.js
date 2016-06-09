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
    ForkLift.CreateHtmlObjects = function(dimen)
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
        /***************************
         * Create DOM Element{DIV}
         * @type {HTMLElement} windowElem 
         */
        var masterContainer = document.createElement('div');

        /***************************
         * Assigns the classnames
         * @type {string} windowElem 
         */
        windowElem.className = 'window-size-' + dimen.wSize; windowElem.className += ' window';

        /**********************************
         * if id is not set, genarate one 
         */
        if ( dimen.hasOwnProperty('id') ) 
        { 
            masterContainer.id = dimen.id; 
        }
        else 
        { 
            masterContainer.id = this.rwi(); /*call self request window ID*/
        }
        /**********************************************
         * import the html objects in to container div
         * @type {string}
         */
        masterContainer.innerHTML = window_innder_objects;

        /***************************************
         * Append the element to the DOM body */
        if( document.getElementById(windowElem.id))
        {
            /* do nothing */
        }
        else
        {
            document.body.appendChild(masterContainer);
        }
        /*****************************
         *  Make the window daggable */
        if(masterContainer)
        {
            /*if element is present then call MakeDraggable*/
            this.MakeDraggable(masterContainer);
            /*****************************************************************
            * Find div with class title and add the custom title text to it */
            $(masterContainer).find('.window-title').html(dimen.title).show()

            /* find .close class element and add a click event listener */
            $(masterContainer).find('.close').on('click', function ()
            {
                $(masterContainer).toggle(
                                    "fast",
                                    function ()
                                    {
                                        $(windowElem).remove();
                                    }
                                );
            });
                // add window open close animation
            $(masterContainer).toggle("fast");

            $(masterContainer).on(
                                'click', 
                                function () {
                                                $(this).css('z-index', window_zIndex++);
                                            }
                            );
        }/*End If Statement*/





    }/**End Function::CreateWindowObjects */


    /***********************************
     * Object function RequestWindowId
     * @returns {string}
     *
     *
     *
     */
    ForkLift.rwi = function()
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