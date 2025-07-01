package com.elearn.app;

import com.elearn.app.configuration.AppConstant;
import com.elearn.app.entities.Role;
import com.elearn.app.entities.User;
import com.elearn.app.repositories.RoleRepo;
import com.elearn.app.repositories.UserRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Date;
import java.util.UUID;

@SpringBootApplication
public class ElearnBackApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(ElearnBackApplication.class, args);
	}

	private RoleRepo roleRepo;
	private UserRepo userRepo;
	private PasswordEncoder passwordEncoder;

	public ElearnBackApplication(RoleRepo roleRepo, UserRepo userRepo, PasswordEncoder passwordEncoder) {
		this.roleRepo = roleRepo;
		this.userRepo = userRepo;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public void run(String... args) throws Exception {

		Role role1=new Role();
		role1.setRoleId(UUID.randomUUID().toString());
		role1.setRoleName(AppConstant.ROLE_ADMIN);

		Role role2=new Role();
		role2.setRoleId(UUID.randomUUID().toString());
		role2.setRoleName(AppConstant.ROLE_GUEST);


		roleRepo.findByRoleName(AppConstant.ROLE_GUEST).ifPresentOrElse(role -> {
			role.setRoleId(role.getRoleId());
		}, ()->{
             roleRepo.save(role2);
		});

		roleRepo.findByRoleName(AppConstant.ROLE_ADMIN).ifPresentOrElse(role -> {
			role.setRoleId(role.getRoleId());
		},()->{
			roleRepo.save(role1);
		});


		User user=new User();

		user.setId(UUID.randomUUID().toString());
		user.setPassword(passwordEncoder.encode("abc"));
		user.setEmail("imran@gmail.com");
		user.setAbout("I am a frontend developer ");
		user.setActive(true);
		user.setName("imran");
		user.setCreatedAt(new Date());
		user.setEmailVerified(true);
		user.assignRole(role1);
		user.assignRole(role2);

		userRepo.findByEmail("imran@gmail.com").ifPresentOrElse(email->{
			System.out.println("imran is there in the database");
		},()->{
			userRepo.save(user);
		});

		User user1=new User();

		user1.setId(UUID.randomUUID().toString());
		user1.setPassword(passwordEncoder.encode("abc"));
		user1.setEmail("imran@gmail.com");
		user1.setAbout("I am a backend developer ");
		user1.setActive(true);
		user1.setName("imran");
		user1.setCreatedAt(new Date());
		user1.setEmailVerified(true);
		user1.assignRole(role2);

		userRepo.findByEmail("abhishek@gmail.com").ifPresentOrElse(email->{
			System.out.println("abhishek is there in the database");
		},()->{
			userRepo.save(user1);
		});


//		User user2=new User();
//
//		user2.setId(UUID.randomUUID().toString());
//		user2.setPassword(passwordEncoder.encode("abc"));
//		user2.setEmail("roshan@gmail.com");
//		user2.setAbout("I am a software developer ");
//		user2.setActive(true);
//		user2.setName("Roshan sharma");
//		user2.setCreatedAt(new Date());
//		user2.setEmailVerified(true);
//		user2.assignRole(role2);
//
//		userRepo.findByEmail("roshan@gmail.com").ifPresentOrElse(email->{
//			System.out.println("roshan is there in the database");
//		},()->{
//			userRepo.save(user2);
//		});

	}
}
