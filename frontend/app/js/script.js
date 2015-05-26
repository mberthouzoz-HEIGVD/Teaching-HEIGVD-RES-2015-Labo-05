function getColor()
{
    $.getJSON("/api", function(result)
    {

        $.each(result, function(name, value)
        {
            $("#color").append('<li>' + value + '</li>');
        });
    });
}