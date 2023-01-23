import { component$, useStore, $ } from '@builder.io/qwik'
import { MediaAttachment } from '~/types'

type Props = {
	mediaAttachment: MediaAttachment
}

export default component$<Props>(({ mediaAttachment }) => {
	const store = useStore({
		isModalOpen: false,
	})

	const onPreviewClick = $(() => {
		document.body.style.overflowY = 'hidden'
		store.isModalOpen = true
	})

	const onModalClose = $(() => {
		document.body.style.overflowY = 'scroll'
		store.isModalOpen = false
	})

	return (
		<>
			<div class={`${store.isModalOpen ? '' : 'cursor-zoom-in'} w-full h-full`}>
				<img
					class={'object-cover w-full h-full rounded'}
					src={mediaAttachment.preview_url || mediaAttachment.url}
					onClick$={onPreviewClick}
				/>
				{store.isModalOpen && (
					<div class="relative pointer-events-auto z-50">
						<div class="overlay inset-0 fixed z-60 bg-black opacity-70"></div>
						<div class="fixed z-70 inset-0 grid place-items-center" onClick$={onModalClose}>
							<img src={mediaAttachment.url} />
						</div>
					</div>
				)}
			</div>
		</>
	)
})
