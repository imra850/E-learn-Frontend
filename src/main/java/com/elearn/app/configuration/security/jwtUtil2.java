//package com.elearn.app.configuration.security;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import io.jsonwebtoken.security.Keys;
//
//import java.security.Key;
//import java.util.Date;
//import java.util.Locale;
//import java.util.function.Function;
//
//public class jwtUtil2 {
//
//    public Key keys=Keys.secretKeyFor(SignatureAlgorithm.HS256);
//
//    public final Long Jwtfinal=5*60*1000L;
//
//    public String extractUsername(String token){
//        return extractClaim(token,Claims::getSubject);
//    }
//
//    public <T> T extractClaim(String token, Function<Claims,T> claimsTFunction){
//        final Claims claims=extractAllClaims(token);
//       return claimsTFunction.apply(claims);
//    }
//
//    public Claims extractAllClaims(String token){
//        return Jwts.parserBuilder().setSigningKey(keys).build().parseClaimsJws(token).getBody();
//    }
//
//    public String generateToken(String username){
//        return createToken(username);
//    }
//
//    public String createToken(String username){
//        return Jwts.builder().setSubject(username).setIssuedAt(new Date(System.currentTimeMillis()))
//                .setExpiration(new Date(System.currentTimeMillis()+Jwtfinal)).compact();
//    }
//
//    public String validateToken(String token,String username){
//        String tokenUsername=extractUsername(token);
//        return (username.equals(tokenUsername) && !isTokenExpired(token));
//    }
//
//
//}
