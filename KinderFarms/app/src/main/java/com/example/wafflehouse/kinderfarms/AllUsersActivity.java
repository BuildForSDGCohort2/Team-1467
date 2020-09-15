package com.example.wafflehouse.kinderfarms;

import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;


import com.firebase.ui.database.FirebaseRecyclerAdapter;
import com.firebase.ui.database.FirebaseRecyclerOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.squareup.picasso.Picasso;

import de.hdodenhof.circleimageview.CircleImageView;

public class AllUsersActivity extends AppCompatActivity {

    private DatabaseReference usersRef;
    private RecyclerView allUsersList;
    private Toolbar mToolbar;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_all_users);



        allUsersList = (RecyclerView) findViewById(R.id.all_users_recycler_list);
        allUsersList.setLayoutManager(new LinearLayoutManager(this));
        usersRef = FirebaseDatabase.getInstance().getReference().child("Users");

        mToolbar =(Toolbar) findViewById(R.id.all_users_toolbar);
        setSupportActionBar(mToolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowHomeEnabled(true);
        getSupportActionBar().setTitle("All Users");


    }

    @Override
    protected void onStart()
    {
        super.onStart();
        FirebaseRecyclerOptions<AllUsers> options=
                new FirebaseRecyclerOptions.Builder<AllUsers>()
                        .setQuery(usersRef, AllUsers.class)
                        .build();

        FirebaseRecyclerAdapter<AllUsers, AllUsersViewHolder> adapter =
                new FirebaseRecyclerAdapter<AllUsers, AllUsersViewHolder>(options)
                {
                    @Override
                    protected void onBindViewHolder(@NonNull AllUsersViewHolder holder, final int position, @NonNull AllUsers model)
                    {
                        holder.userName.setText(model.getUser_name());
                        holder.userStatus.setText(model.getUser_status());
                        Picasso.get().load(model.getUser_image()).placeholder(R.drawable.default_avatar).into(holder.profileImage);

                        holder.itemView.setOnClickListener(new View.OnClickListener()
                        {
                            @Override
                            public void onClick(View v)
                            {
                                String visit_user_id = getRef(position).getKey();

                                Intent profileIntent = new Intent(AllUsersActivity.this, ProfileActivity.class);
                                profileIntent.putExtra("visit_user_id", visit_user_id);
                                startActivity(profileIntent);

                            }
                        });
                    }

                    @NonNull
                    @Override
                    public AllUsersViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType)
                    {
                        View view = LayoutInflater.from(parent.getContext()).inflate
                                (R.layout.all_users_display_layout, parent, false);
                        AllUsersViewHolder viewHolder = new AllUsersViewHolder(view);
                        return viewHolder;
                    }
                };

        allUsersList.setAdapter(adapter);
        adapter.startListening();
    }

    public static class AllUsersViewHolder extends RecyclerView.ViewHolder
    {
        TextView userName, userStatus;
        CircleImageView profileImage;

        public AllUsersViewHolder(View itemView)
        {
            super(itemView);

            userName = itemView.findViewById(R.id.all_users_username);
            userStatus = itemView.findViewById(R.id.all_users_status);
            profileImage = itemView.findViewById(R.id.all_users_profile_image);
        }
    }

}