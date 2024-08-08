import { SubmitHandler, useForm } from 'react-hook-form'
import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

import styles from './Home.module.scss'

interface IFormState {
	name: string
	email: string
}

enum Status {
	'waiting',
	'loading',
	'success',
}

function Home() {
	const { register, handleSubmit, reset } = useForm<IFormState>()
	const [status, setStatus] = useState<Status>(Status.waiting)

	const onSubmit: SubmitHandler<IFormState> = useCallback(
		async data => {
			setStatus(Status.loading)

			const prompt = axios.post(import.meta.env.VITE_API_URL, data)

			toast.promise(prompt, {
				pending: 'Отправление заявки...',
				success: 'Заявка успешно отправлена! 👌',
				error: 'Произошла какая-то ошибка 🤯',
			})

			prompt
				.then(res => {
					if (res.status === 201) {
						setStatus(Status.success)
						console.log(res.data)

						setTimeout(() => {
							setStatus(Status.waiting)
						}, 5000)
					}
				})
				.catch(error => {
					setStatus(Status.waiting)
					console.log(error)
				})
				.finally(() => reset())
		},
		[reset],
	)

	return (
		<div className={styles.wrapper}>
			{status === Status.success ? (
				<div className={styles.success}>Заявка оставлена!</div>
			) : (
				<form onSubmit={handleSubmit(onSubmit)}>
					<h1>GTA 6 - Оставь заявку</h1>
					<input
						type='name'
						placeholder='Введите имя:'
						{...register('name', {
							required: true,
						})}
					/>
					<input
						type='email'
						placeholder='Введите Email:'
						{...register('email', {
							required: true,
						})}
					/>
					<button disabled={status === Status.loading}>
						{status === Status.loading ? 'Загрузка...' : 'Хочу ГТА!'}
					</button>
				</form>
			)}
		</div>
	)
}

export default Home
