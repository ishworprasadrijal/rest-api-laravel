        <div class="card-body">
            <div class="card" style="width: 35rem;">
              <img class="card-img-top rounded mx-auto d-block" src="{{URL::to('uploads/logo.png')}}" alt="Card image cap" style="width: 15rem;">
              <div class="card-body" style="text-align: center;">
                   <h5 class="card-title"><strong>{!!$user->name!!}</strong></h5>
                <p class="card-text"><strong></strong></p>
              </div>
              <ul class="list-group list-group-flush">
                <p class="card-body text-justify">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </ul>
              <div class="card-body text-center">
                <label>@lang('Member_since')</label> <a href="#" class="card-link"></a>
                <label>@lang('Status')</label> <a href="#" class="card-link"></a>
              </div>
            </div>
        </div>