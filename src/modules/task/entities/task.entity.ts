import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn} from 'typeorm'
@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name : string

    @Column()
    done: boolean

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date

}



