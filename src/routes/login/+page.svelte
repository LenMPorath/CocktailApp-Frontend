<script lang="ts">
	import type { LoginRequestModel, LoginResponseModel } from "$lib/models/login";
	import { fetchApi, HttpMethod } from "$lib/services/api";
	import { errToast, succToast } from "$lib/toasts";
	import { SlideToggle, getToastStore, initializeStores, type ToastSettings } from "@skeletonlabs/skeleton";

	const toastStore = getToastStore();

	let login_in_progress = false;
	let guestToggleChecked = true;

	let username = '';
	let password = '';
	let errCode = "";

	async function handleLogin() {
	login_in_progress = true;

	try {
		let body: LoginRequestModel = { username, password, guest: guestToggleChecked };
		const response = await fetchApi("/login", HttpMethod.POST, body);
		
		// Erfolgreiches Login
		localStorage.setItem("access_token", response.access_token);
		localStorage.setItem("refresh_token", response.refresh_token);
		toastStore.trigger(succToast("Erfolgreich angemeldet!"));
	} catch (error) {
		// Fehlerdetails extrahieren und im Toast anzeigen, wenn 'error' eine Message enthält
		if (error instanceof Error) {
			errCode = error.message;
		} else {
			errCode = "Ein unbekannter Fehler ist aufgetreten.";
		}
		toastStore.trigger(errToast("Anmeldung fehlgeschlagen", errCode));
	} finally {
		login_in_progress = false;
	}
}

</script>

<div class="flex flex-col h-full items-center justify-center space-y-10">
	<img class="w-1/12 min-w-20 invert" alt="CocktailApp Logo" src="logo.png"/>
	<h1 class="text-3xl ">Len's CocktailApp</h1>
	<div class="w-full max-w-sm bg-secondary-900 p-5 rounded-2xl">
		<form class="space-y-5" on:submit|preventDefault={handleLogin}>
			<div>
				<label class="block text-token text-sm font-bold mb-2" for="username">
					Nutzername
				</label>
				<input
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					bind:value={username}
					name="username"
					id="username"
					type="text"
					autocomplete="username"
					required
				/>
			</div>
			<div class="flex justify-center items-center flex-col w-full ">
				<SlideToggle name="guest-toggle" checked={guestToggleChecked} on:change={() => {
					guestToggleChecked = !guestToggleChecked; 
					password = '';
				}}>
					Ich bin ein Gast
				</SlideToggle>

				{#if !guestToggleChecked} 
					<div class="w-full">
						<label class="block text-token text-sm font-bold mb-2" for="password">
							Passwort
						</label>
						<input
							class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
							bind:value={password}
							name="password"
							id="password"
							type="password"
							autocomplete="current-password"
							required
						/>
					</div>
				{:else}
					<div class="p-4 text-center">
						Wenn du dich als Gast anmeldest, kannst du zwar Bestellungen aufgeben, kannst dann aber keine Favoriten festlegen oder an zahlungspflichtigen Sessions teilnehmen.
					</div>
				{/if}
			</div>

			<div class="flex justify-center">
				<button
					class="{login_in_progress ? 'variant-ghost-primary pointer-events-none' : 'variant-filled-primary'} btn w-32"
					disabled={login_in_progress}
				>
					{login_in_progress ? "Anmelden..." : "Anmelden"}
				</button>
			</div>
		</form>
	</div>
</div>
