/**
 * Created by Resi Tamas on 30/03/2017.
 */
$(function(){
    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 15,
        format: 'yyyy-mm-dd',
        default: $(this).val(),
        onSet: function( arg ){
            if ( 'select' in arg ){
                this.close();
            }
        }
    });
})
