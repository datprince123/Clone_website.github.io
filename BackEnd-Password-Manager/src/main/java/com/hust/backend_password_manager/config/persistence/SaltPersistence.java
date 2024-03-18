package com.hust.backend_password_manager.config.persistence;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;
import java.util.HashMap;

@Configuration
@EnableJpaRepositories(
        basePackages = "com.hust.backend_password_manager.repository.secret_repository",
        entityManagerFactoryRef = "secretEntityManager",
        transactionManagerRef = "secretTransactionManager"
)
public class SaltPersistence {


    @Value( "${hibernate.hbm2ddl.auto}" )
    String auto;

    @Value( "${spring.datasource.driver-class-name}" )
    String driverClassName;

    @Value( "${spring.datasource.secret.url}" )
    String url;

    @Value( "${spring.datasource.secret.username}" )
    String user;

    @Value( "${spring.datasource.secret.password}" )
    String pass;

    @Bean
    @Primary
    public LocalContainerEntityManagerFactoryBean secretEntityManager() {
        LocalContainerEntityManagerFactoryBean em
                = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(secretDataSource());
        em.setPackagesToScan("com.hust.backend_password_manager.entity.secret_entity");
        HibernateJpaVendorAdapter vendorAdapter
                = new HibernateJpaVendorAdapter();
        em.setJpaVendorAdapter(vendorAdapter);
        HashMap<String, Object> properties = new HashMap<>();
        properties.put("hibernate.hbm2ddl.auto", auto);
        properties.put("hibernate.dialect", "org.hibernate.dialect.MySQLDialect");
        em.setJpaPropertyMap(properties);

        return em;
    }

    @Primary
    @Bean
    public DataSource secretDataSource() {

        DriverManagerDataSource dataSource
                = new DriverManagerDataSource();
        dataSource.setDriverClassName(driverClassName);
        dataSource.setUrl(url);
        dataSource.setUsername(user);
        dataSource.setPassword(pass);

        return dataSource;
    }

    @Primary
    @Bean
    public PlatformTransactionManager secretTransactionManager() {

        JpaTransactionManager transactionManager
                = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(
                secretEntityManager().getObject());
        return transactionManager;
    }


}


