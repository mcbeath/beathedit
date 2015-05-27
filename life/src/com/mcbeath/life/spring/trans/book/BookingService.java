package com.mcbeath.life.spring.trans.book;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.transaction.annotation.Transactional;

public class BookingService {

	private final static Logger log = LoggerFactory.getLogger(BookingService.class);

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Transactional
    public void book(String... persons) {
        for (String person : persons) {
            log.info("Booking " + person + " in a seat...");
            jdbcTemplate.update("insert into BOOKINGS(FIRST_NAME) values (?)", person);
        }
    };

    /**
     * 在JDBC的操作中，有很多情况是要将RresultSet里的数据封装到一个持久化的bean里，再把持久化的Bean封装到集合中。
     * 这样会造成大量的代码重复，不利于代码重用。而RowMapper正好解决了这个问题。
     * @return
     */
    public List<String> findAllBookings() {
        return jdbcTemplate.query("select FIRST_NAME from BOOKINGS", new RowMapper<String>() {
            @Override
            public String mapRow(ResultSet rs, int rowNum) throws SQLException {
                return rs.getString("FIRST_NAME");
            }
        });
    }

}