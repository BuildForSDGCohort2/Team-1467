package com.example.wafflehouse.kinderfarms;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.firebase.ui.database.FirebaseRecyclerAdapter;
import com.firebase.ui.database.FirebaseRecyclerOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.squareup.picasso.Picasso;

import de.hdodenhof.circleimageview.CircleImageView;


public class FriendsFragment extends Fragment
{
    private View friendsView;
    private RecyclerView myFriendsList;
    private DatabaseReference friendsReference, usersRef;
    private FirebaseAuth mAuth;
    private String currentUserId;


    public FriendsFragment()
    {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState)
    {
        // Inflate the layout for this fragment

        mAuth = FirebaseAuth.getInstance();
        currentUserId = mAuth.getCurrentUser().getUid();

        friendsReference = FirebaseDatabase.getInstance().getReference().child("Friends").child(currentUserId);
        usersRef = FirebaseDatabase.getInstance().getReference().child("Users");

        friendsView = inflater.inflate(R.layout.fragment_friends, container, false);
       myFriendsList = (RecyclerView) friendsView.findViewById(R.id.friends_list);
       myFriendsList.setLayoutManager(new LinearLayoutManager(getContext()));
       return friendsView;
    }

    @Override
    public void onStart()
    {
        super.onStart();
        FirebaseRecyclerOptions options = new FirebaseRecyclerOptions.Builder<AllUsers>()
                .setQuery(friendsReference, AllUsers.class)
                .build();

        FirebaseRecyclerAdapter<AllUsers, FriendsViewHolder> adapter
                = new FirebaseRecyclerAdapter<AllUsers, FriendsViewHolder>(options)
        {
            @Override
            protected void onBindViewHolder(@NonNull final FriendsViewHolder holder,final int position, @NonNull AllUsers model)
            {
                String userIDs = getRef(position).getKey();
                usersRef.child(userIDs).addValueEventListener(new ValueEventListener()
                {
                    @Override
                    public void onDataChange(DataSnapshot dataSnapshot)
                    {
                        if (dataSnapshot.hasChild("image"))
                        {
                            String userName = dataSnapshot.child("user_name").getValue().toString();
                            String userStatus = dataSnapshot.child("user_status").getValue().toString();
                            String userImage = dataSnapshot.child("user_image").getValue().toString();


                            holder.profileName.setText(userName);
                            holder.profileStatus.setText(userStatus);
                            Picasso.get().load(userImage).placeholder(R.drawable.default_avatar).into(holder.profileImage);
                        }
                        else
                        {
                            String userName = dataSnapshot.child("user_name").getValue().toString();
                            String userStatus = dataSnapshot.child("user_status").getValue().toString();

                            holder.profileName.setText(userName);
                            holder.profileStatus.setText(userStatus);

                            holder.itemView.setOnClickListener(new View.OnClickListener()
                            {
                                @Override
                                public void onClick(View v)
                                {
                                    String visit_user_id = getRef(position).getKey();


                                    Intent profileIntent = new Intent((getActivity()), ProfileActivity.class);
                                    profileIntent.putExtra("visit_user_id", visit_user_id);
                                    startActivity(profileIntent);

                                }
                            });





                        }
                    }

                    @Override
                    public void onCancelled(DatabaseError databaseError)
                    {

                    }
                });

            }

            @NonNull
            @Override
            public FriendsViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType)
            {
                View view = LayoutInflater.from(parent.getContext()).inflate
                        (R.layout.all_users_display_layout, parent, false);
                FriendsViewHolder viewHolder = new FriendsViewHolder(view);
                return viewHolder;
            }
        };

        myFriendsList.setAdapter(adapter);
        adapter.startListening();


    }

    public static class FriendsViewHolder extends RecyclerView.ViewHolder
    {
        TextView profileName, profileStatus;
        CircleImageView profileImage;

        public FriendsViewHolder(View itemView)
        {
            super(itemView);

            profileName = itemView.findViewById(R.id.all_users_username);
            profileStatus = itemView.findViewById(R.id.all_users_status);
            profileImage = itemView.findViewById(R.id.all_users_profile_image);
        }
    }
}
