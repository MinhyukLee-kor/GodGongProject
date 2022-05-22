package com.gg.config;


import com.gg.config.jwt.JwtAuthenticationEntryPoint;
import com.gg.config.jwt.JwtAuthenticationFilter;
import com.gg.service.PrincipalDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;



@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
		securedEnabled = true,
		jsr250Enabled = true,
		prePostEnabled = true
)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	PrincipalDetailsService principalDetailsService;

	@Autowired
	private JwtAuthenticationEntryPoint authEntryPointJwt;

	// authenticationManager Bean 등록
	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Bean
	public JwtAuthenticationFilter jwtAuthenticationFilter() {
		return new JwtAuthenticationFilter();
	}

	@Override
	protected void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
		authenticationManagerBuilder
				.userDetailsService(principalDetailsService)
				.passwordEncoder(passwordEncoder());
	}


	// 암호화에 필요한 PasswordEncoder Bean 등록
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
				.cors()
				.and()
				.csrf()
				.disable()
				.exceptionHandling()
				.authenticationEntryPoint(authEntryPointJwt)
				.and()
				// 토큰으로 security를 적용하기 때문에 session은 stateless로 막음
				.sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and()
				.authorizeRequests()
				.antMatchers("/api/auth/**","/api/main/**","/api/mypage/**").permitAll()
				.antMatchers( "/api/studytime/recent").permitAll()
				.antMatchers("/api/user/**", "/api/user/{id}/**").permitAll()
				.antMatchers("/api/user/checkUsernameAvailability", "/api/user/checkEmailAvailability").permitAll()
				.antMatchers( "/api/chat/**", "/api/diary/**", "/api/studylog/**", "/api/todo/**").permitAll()
				.antMatchers("/user/**").permitAll()
				.antMatchers(HttpMethod.GET, "/api/users/**", "/api/chat/**", "/api/ws/**").permitAll()

				// 위 경로 이외의 토큰을 사용하는 경우 접근할 수 있도록 한다.
				.anyRequest().authenticated();
		// JWT security filter 추가
		http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
	}
}
