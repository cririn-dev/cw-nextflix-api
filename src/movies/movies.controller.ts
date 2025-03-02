import { Controller, Get, Param } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Controller('movies')
export class MoviesController {
    private readonly API_URL = 'https://api.themoviedb.org/3/movie';
    private readonly API_TOKEN: string;

    constructor(private configService: ConfigService) {
        this.API_TOKEN = this.configService.get<string>('TMDB_ACCESS_TOKEN') || ''; // 🔹 กำหนดค่าครั้งเดียวใน constructor
    }

    @Get()
    async getMovies() {
        try {
            const response = await axios.get(`${this.API_URL}/popular`, {
                headers: this.getHeaders(), // 🔹 ใช้ฟังก์ชัน getHeaders()
            });

            return response.data.results;
        } catch (error) {
            console.error('Error fetching movies:', error.response?.data || error.message);
            return { message: 'Error fetching movies', error: error.message };
        }
    }

    @Get(':id')
    async getMovieById(@Param('id') id: string) {
        try {
            const response = await axios.get(`${this.API_URL}/${id}`, {
                headers: this.getHeaders(), // 🔹 ใช้ฟังก์ชัน getHeaders()
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching movie:", error.response?.data || error.message);
            return { message: "Error fetching movie", error: error.message };
        }
    }

    // 🔹 ฟังก์ชันสำหรับสร้าง Headers ลดการซ้ำซ้อน
    private getHeaders() {
        return {
            Authorization: `Bearer ${this.API_TOKEN}`,
            'Content-Type': 'application/json',
        };
    }
}
