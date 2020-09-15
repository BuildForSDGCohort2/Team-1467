package com.example.wafflehouse.kinderfarms;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class StartPageActivity extends AppCompatActivity {

    private Button NewAccountButton;
    private Button ExistingAccountButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_start_page);

        NewAccountButton = (Button)findViewById(R.id.register);
        ExistingAccountButton = (Button)findViewById(R.id.login);

        NewAccountButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v)
            {
                Intent registerIntent = new Intent(StartPageActivity.this,RegisterActivity.class);
                startActivity(registerIntent);
            }
        });

        ExistingAccountButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v)
            {
                Intent loginIntent = new Intent(StartPageActivity.this,LoginActivity.class);
                startActivity(loginIntent);
            }
        });

    }
}
