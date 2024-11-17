<script lang="ts">
	import type { LoginRequestModel, UserCreateModel } from "$lib/models/login";
	import { fetchApi, HttpMethod } from "$lib/services/api";
	import { onMount } from "svelte";

	let register_in_progress = false;

	let passwordTooShortOrLong = true;
	let passwordNoNumbers = true;
	let passwordNoUpperCase = true;
	let passwordNoLowerCase = true;
	let passwordIsValid = false;

	let username = '';
	let password = '';

	let userAmount : number;

	onMount(()=> {
		getUserAmount();
	})

	async function getUserAmount() {
		try {
			userAmount = await fetchApi("/getUserAmount", HttpMethod.GET);

		} catch (error) {
			alert("An error occurred during fetching.");
			userAmount = -1; 
		}
	}

	async function handleRegister() {
		try {
			let body: UserCreateModel = {username: username, password: password}
			await fetchApi("/createUser", HttpMethod.POST, body);
			getUserAmount();
		} catch (error) {
			alert("An error occurred during fetching.");
		} finally {
			register_in_progress = false;
		}
	}

	function validatePassword() {
	// Überprüfung der Passwortbedingungen
	passwordNoNumbers = !/[0-9]/.test(password);          // enthält eine Zahl
	passwordNoUpperCase = !/[A-Z]/.test(password);        // enthält einen Großbuchstaben
	passwordNoLowerCase = !/[a-z]/.test(password);        // enthält einen Kleinbuchstaben
	passwordTooShortOrLong = !(password.length >= 8 && password.length <= 255); // Länge

	// Validierung des Passworts: alle Bedingungen müssen erfüllt sein
	passwordIsValid = !passwordNoNumbers && !passwordNoUpperCase && !passwordNoLowerCase && !passwordTooShortOrLong;
}

</script>

<div class="flex flex-col h-full items-center justify-center space-y-10">
	{#if userAmount == 0}
		<div class="w-1/3">
			<p class="text-2xl"></p>
		</div>
		<div class="w-full max-w-md bg-secondary-900 p-5 rounded-2xl">
			<form class="space-y-5" on:submit|preventDefault={handleRegister}>
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

				<div class="w-full">
					<label class="block text-token text-sm font-bold mb-2" for="password">
						Passwort
					</label>
					<input
						class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
						bind:value={password}
						on:input={() => validatePassword()}
						name="password"
						id="password"
						type="password"
						autocomplete="current-password"
						required
					/>
				</div>
				
				<div class="w-full">
					<label class="block text-token text-sm font-bold mb-2" for="password">
						Das Passwort muss folgende Bedingungen erfüllen:
					</label>
					<div class="pl-4">
						<ul>
							<li>{passwordNoUpperCase ? '✘' : '✔'} enthält Großbuchstaben</li>
							<li>{passwordNoLowerCase ? '✘' : '✔'} enthält Kleinbuchstaben</li>
							<li>{passwordNoNumbers ? '✘' : '✔'} enthält Zahlen</li>
							<li>{passwordTooShortOrLong ? '✘' : '✔'} ist 8 bis 255 Zeichen lang</li>
						</ul>
					</div>
				</div>

				<div class="flex justify-center">
					<button
						class="{register_in_progress ? 'variant-ghost-primary pointer-events-none' : 'variant-filled-primary'} btn w-32"
						disabled={register_in_progress || !passwordIsValid}
					>
						{register_in_progress ? "Registrieren..." : "Registrieren"}
					</button>
				</div>
			</form>
		</div>
		
	{:else if userAmount > 0}
		<div class="w-1/3 text-center">
			<p class="text-2xl">Es ist bereits ein Nutzer registriert.</p>
		</div>
	{:else}
		<div class="w-1/3 text-center">
			<p class="text-2xl">Es ist ein Fehler beim Verbinden zum Backend aufgetreten.</p>
			<p class="text-2xl">Bitte informiere den Administrator!</p>
		</div>
	{/if}
</div>
