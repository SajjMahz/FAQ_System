<html>
   <head>
      <title>Verified</title>
   </head>
   <body>
      <p>Enter New Password</p>
      <form method='POST' action="{{ route('password.update', ['token' => $token])}}">
        @csrf
        <div>
            <label for="email">Email:</label>
            <input id="email" type="email" name="email" value="{{ $email ?? old('email') }}" required readonly>
         </div>
        <div>
           <label for="password">New Password:</label>
           <input type="password" name="password">
        </div>
        <div>
           <label for="password_confirmation">Confirm Password:</label>
           <input type="password" name="password_confirmation">
        </div>
        <button type="submit">Submit</button>
      </form>
   </body>
</html>