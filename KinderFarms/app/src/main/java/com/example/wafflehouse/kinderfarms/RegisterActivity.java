package com.example.wafflehouse.kinderfarms;

import android.app.ProgressDialog;
import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.iid.FirebaseInstanceId;

public class RegisterActivity extends AppCompatActivity {
    private FirebaseAuth mAuth;
    private DatabaseReference storeUserDefaultDataReference;
    private Toolbar mtoolbar;
    private ProgressDialog loadingBar;
    private EditText registerUserName;
    private EditText registerUserEmail;
    private EditText registerUserPassword;
    private Button signUpButton;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        mAuth = FirebaseAuth.getInstance();

        mtoolbar =(Toolbar)findViewById(R.id.register_toolbar);
        setSupportActionBar(mtoolbar);
        getSupportActionBar().setTitle("Sign Up");
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        registerUserName = (EditText)findViewById(R.id.name_register);
        registerUserEmail = (EditText)findViewById(R.id.email_register);
        registerUserPassword = (EditText)findViewById(R.id.password_register);
        signUpButton = (Button)findViewById(R.id.sign_up);

        loadingBar = new ProgressDialog(this);

        signUpButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v)
            {
               final String name = registerUserName.getText().toString();
               String email = registerUserEmail.getText().toString();
               String password = registerUserPassword.getText().toString();
               
               RegisterAccount(name,email,password);
            }
        });
    }

    private void RegisterAccount(final String name, String email, String password)
    {
        if (TextUtils.isEmpty(name))
        {
            Toast.makeText(this, "Please write your name", Toast.LENGTH_LONG).show();
        }

        if (TextUtils.isEmpty(email))
        {
            Toast.makeText(this, "Please confirm your email", Toast.LENGTH_LONG).show();
        }

        if (TextUtils.isEmpty(password))
        {
            Toast.makeText(this, "Please write your password", Toast.LENGTH_LONG).show();
        }

        else
            {
                loadingBar.setTitle("Registering");
                loadingBar.setMessage("Please wait as we Create your new account");
                loadingBar.show();

                mAuth.createUserWithEmailAndPassword(email, password)
                        .addOnCompleteListener(new OnCompleteListener<AuthResult>(){
                            @Override
                            public void onComplete(@NonNull Task<AuthResult> task)
                            {
                                if (task.isSuccessful())
                                {   String DeviceToken = FirebaseInstanceId.getInstance().getToken();
                                    String current_user_Id = mAuth.getCurrentUser().getUid();
                                    storeUserDefaultDataReference = FirebaseDatabase.getInstance().getReference().child("Users").child(current_user_Id);
                                    storeUserDefaultDataReference.child("user_name").setValue(name);
                                    storeUserDefaultDataReference.child("user_status").setValue("Hey there");
                                    storeUserDefaultDataReference.child("user_image").setValue("default_avatar");
                                    storeUserDefaultDataReference.child("device_token").setValue(DeviceToken);
                                    storeUserDefaultDataReference.child("user_thumb_image").setValue("default_image")
                                            .addOnCompleteListener(new OnCompleteListener<Void>() {
                                                @Override
                                                public void onComplete(@NonNull Task<Void> task)
                                                {
                                                    if (task.isSuccessful())
                                                    {
                                                        Intent mainIntent = new Intent(RegisterActivity.this,MainActivity.class);
                                                        mainIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                                                        startActivity(mainIntent);
                                                        finish();
                                                    }
                                                }
                                            });

                                }
                                else
                                {
                                    Toast.makeText(RegisterActivity.this,"An Unknown Error Occurred " +
                                                    "Please confirm your credentials or try again later. ",
                                            Toast.LENGTH_SHORT).show();
                                }
                                loadingBar.dismiss();
                            }
                        });
            }
    }

}
