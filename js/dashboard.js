// dromdown Menu

$('.my-dropdown').click(function(){
    let $myDropdownMenu = $(this).find(".my-dropdown-menu");
    let $chevronIcon = $(this).find("i.fa-solid.fa-chevron-down.fa-fw");
    
    
    if ($myDropdownMenu.height() !== 100){
        // Close the dropdown menu
        $('.my-dropdown-menu').css({'height':'0', 'transition':'.5s ease'});
        $myDropdownMenu.css({'height':'100px', 'transition':'.5s ease'});
        $chevronIcon.css({'transform':'rotate(180deg)', 'transition': '1s ease'})
        
    } else {
        // Close the dropdown menu
        $myDropdownMenu.css({'height':'0', 'transition':'.5s ease'});
        $chevronIcon.css({'transform':'rotate(0deg)', 'transition': 'transform 1s'});
    }
});

