<?php $columns = isset($columns) ? $columns : 4; /* show 3 columns default */ ?>
<?php if(isset($filters) && !empty($filters)){ $i=1; ?>

	<div class="lp col-md-12 bg-light">
		<table class="tf">
			<tr>
				<input type="hidden" name="current_url" value="{{URL::current()}}" class="error">
				@foreach($filters as $label => $filter)
					<?= (isset($columns) && $columns == $i++) ? '</tr><tr><td colspan="3">&nbsp;</tr><tr>' : ''; ?>



					{{-- DROP DOWN FOR FIXED SELECT TYPE --}}
					<?php if(isset($filter['options'])){ ?>
						<td>
			    			<label for="f_{{$label}}">{{$filter['label']}}</label>
			    			<select name="{{$filter['column']}}" class="fp">
			    				<option value="" >@lang('Select Role')</option>
			    				@foreach($filter['options'] as $key => $option)
			    					<option value="{{$key}}" {{ ($filter['value']==$key)? 'selected' :'' }} >{{$option}}</option>
			    				@endforeach
			    			</select>
			    		</td>




					{{-- DROP DOWN FOR DYNAMIC SELECT TYPE & AUTOCOMPLETE --}}
					<?php }elseif(isset($filter['typeahead'])){ ?>
						<td>
			    			<label for="f_{{$label}}">{{$filter['label']}}</label>
							<input type="text" name="{{$filter['column']}}" placeholder="{{$filter['label']}}" class="fp" id="typeahead" value="{{$filter['value']}}" data-url="{{ $filter['typeahead']['url']}}" >
			    		</td>



					{{-- NORMAL TEXTBOX --}}
					<?php }else{ ?>
			    		<td>
			    			<label for="f_{{$label}}">{{$filter['label']}}</label>
							<input type="text" name="{{$filter['column']}}" placeholder="{{$filter['label']}}" class="fp" value="{{$filter['value']}}">
			    		</td>
		    		<?php } ?>
				@endforeach
			</tr>
		</table>
		<span class="btn btn-sm btn-info btf rf pull-right">Filter</span>
		<span class="btn btn-sm btn-info btf pull-right dn">Filter</span>
		<div class="clearfix"></div>
		<br>
	</div>

<?php } ?>
